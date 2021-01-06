import {IMatch} from "~/interfaces/IMatch";
import {IAgreement} from "~/interfaces/IAgreement";
import {IInvoiceItem} from "~/interfaces/IInvoiceItem";

export interface IInvoice {
    id: number
    sequenceNumber: string
    price: number
    vat: number
    paymentHandling: number
    shipping: number
    shippingChargeCalculation: number
    auctionChargeCalculation: number
    vatChargeCalculation: number
    totalChargeCalculation: number
    totalChargeVatCalculation: number
    shippingCharge: number
    auctionCharge: number
    setupCharge: number
    vatCharge: number
    totalCharge: number
    clubPayout: number
    matchId: number
    match: IMatch
    agreementId: number
    agreement: IAgreement
    items: IInvoiceItem[]
}
