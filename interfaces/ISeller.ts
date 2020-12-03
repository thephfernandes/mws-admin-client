export interface ISeller {
    id: number;
    nextInvoiceId: number;
    invoiceIdPrefix: string;
    name: string;
    vatNumber: string;
    address1: string;
    address2: string;
    country: string;
    email: string;
    website: string;
}
