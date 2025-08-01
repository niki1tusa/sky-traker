import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router'
import { OPENSKY_SERVICE } from '@/api/open-sky-service';

import type { IOpenSkyState } from '@/api/data/flight.type';
import { airportsService } from '@/api/service';

type ExtendedFlight = IOpenSkyState & {
  departure?: ReturnType<typeof airportsService.getByIcao> | null;
  arrival?: ReturnType<typeof airportsService.getByIcao> | null;
};

export const useCurrentFlight = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activedId = searchParams.get('flightId') || undefined;

  // Все борта в bbox
  const { data: flights } = useQuery({
    queryKey: ['flights'],
    queryFn: () => OPENSKY_SERVICE.getOpenSkyFlights(20),
    staleTime: 300_000,
  });

  const activeFlight = useMemo(
    () => flights?.find(f => f.icao24 === activedId) ?? null,
    [flights, activedId]
  );

  // История полетов (для dep/arr) — лучше вызывать через ваш сервер (прокси)
  const { data: history } = useQuery({
    queryKey: ['aircraft-flights', activeFlight?.icao24],
    queryFn: () => OPENSKY_SERVICE.getAircraftFlights(activeFlight!.icao24, 24),
    enabled: Boolean(activeFlight?.icao24),
    staleTime: 60_000,
  });

  const last = history?.[history.length - 1]; // эквивалент .at(-1), совместимо шире
  const departure = airportsService.getByIcao(last?.estDepartureAirport ?? null);
  const arrival   = airportsService.getByIcao(last?.estArrivalAirport ?? null);

  const extendedFlight: ExtendedFlight | null = activeFlight
    ? { ...activeFlight, departure, arrival }
    : null;

  return { activeFlight: extendedFlight, searchParams, setSearchParams };
};
