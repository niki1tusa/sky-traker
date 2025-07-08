import  cn  from 'clsx'

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse bg-gray-400", className)}
      {...props}
    />
  )
}

export { Skeleton }
