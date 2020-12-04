export interface IInvoice {
    id:                        number;
    matchID:                   number;
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
    agreementID:               number;
    agreement:                 { [key: string]: number | null };
    items:                     any[];
}