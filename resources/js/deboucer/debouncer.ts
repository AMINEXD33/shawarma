import { useRef, useEffect } from "react";

export default function useDebounce<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    return (...args: Parameters<T>) => {
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => func(...args), delay);
    };
}