import {IInvoice} from "~/interfaces/IInvoice";

export interface IInvoiceItem {
    id: number;
    title: number;
    price: number;
    vat: number;
    paymentHandling: number;
    shipping: number;
    invoiceId: number;
    invoice: IInvoice
}