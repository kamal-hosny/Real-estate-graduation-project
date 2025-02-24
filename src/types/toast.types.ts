export type TToast = {
    id?: string;
    type: "success" | "error" | "warning" | "info"
    message: string;
    delayAppearance?: boolean
}