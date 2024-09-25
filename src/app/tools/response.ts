import { errorDesc } from "./errorDesc";

export interface response {
    success: boolean;
    message: string;
    data: any;
    error: boolean;
    errors : errorDesc[]
}