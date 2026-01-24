import { cn } from "../../lib/utils.js" // Alias (@/) အလုပ်မလုပ်ရင် ဒီလို path အမှန်ပြောင်းပေးပါ

function Skeleton({ className, ...props }) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-muted animate-pulse rounded-md", className)}
            {...props}
        />
    )
}

export { Skeleton }