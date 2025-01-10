export function formatToDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-11)
    const day = String(date.getDate()).padStart(2, '0'); // Día
    return `${year}-${month}-${day}`;
}