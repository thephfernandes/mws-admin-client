export default class InvoiceAgreement {
  public clubId: number = 0;
  public sellerId: number = 0;
  public name: string = "Default";
  public thirdPartyVatPercentage: string | number = "";
  public paymentHandlingPercentage: number = 1.5;
  public shippingInsurancePercentage: number = 1;
  public shippingFlatFee: number = 50;
  public minimumGuarantee: number = 0;
  public mwsHandlingPercentage: number = 21;
  public mwsAuctionPercentage: number = 21;
  public mwsVatPercentage: number = 21;
  public mwsSetupFee: SetupFee = {value: 0, frequency: SetupFeeFrequency.PER_MATCH};
  public unpaidProductGuarantee: number = 89;
}

interface SetupFee {
  value: number;
  frequency: SetupFeeFrequency,
}

export enum SetupFeeFrequency {
  PER_MATCH = 'per match',
  PER_SEASON = 'per season',
  FIRST_MATCH_FREE = 'first match free',
}