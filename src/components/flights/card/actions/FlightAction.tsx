import { Heart } from "lucide-react";

export default function FlightAction({handlerFavorite, isFavorite}:{
    isFavorite?: boolean
    handleFavorite?: () =>void
}) {
  return (
    <div>

        <button className="bg-background absolute top-7 -right-12 p-2 rounded-xl" onClick={handlerFavorite}>
						{isFavorite ? <Heart fill='#fca316' color='#fca316'/> : <Heart />}
					</button>
    </div>
   					
  )
}
