export function formatEventDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const time = date.toLocaleString("default", {
        hour: 'numeric',
        minute: "2-digit",
        hour12: true
    });
    // Get day suffix 
    const suffix = getDaySuffix(day);

    return { 
        date: day,
        suffix,
        month,
        year,
        time,
    }
}
 
function getDaySuffix(day: number): "st" | "nd" | "rd" | "th" {
    if (day > 3 && day < 21) return "th" 
    switch (day % 10) {
            case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
        }
}
