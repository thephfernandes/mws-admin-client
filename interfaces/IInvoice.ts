export interface IInvoice {
    id:                        number;
    matchId:                   number;
    price:                     number;
    vat:                       number;
    paymentHandling:           number;
    shipping:                  number;
    shippingChargeCalculation: number;
    auctionChargeCalculation:  number;
    vatChargeCalculation:      number;
    totalChargeCalculation:    number;
    totalChargeVatCalculation: number;
    shippingCharge:            number;
    auctionCharge:             number;
    setupCharge:               number;
    vatCharge:                 number;
    totalCharge:               number;
    clubPayout:                number;
    agreementId:               number;
    agreement:                 { [key: string]: number | null };
    items:                     any[];
}