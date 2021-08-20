// This file doesn't work
import { setupServer } from 'msw/node'

interface Handlers {
    sides: any[]
}

declare global {
    interface $T {
        setupServer: (handlers: any[]) => ReturnType<typeof setupServer>;
        handlers: Handlers;
        setUserId: (userId?: string) => void; 
    }
}
