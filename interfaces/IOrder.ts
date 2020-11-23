export interface IOrder {
    playerName:                    string;
    playerID:                      number;
    productPrice:                  number;
    productID:                     number;
    userID:                        number;
    userName:                      string;
    userMail:                      string;
    userPhoneNumber:               string;
    userAddress:                   string;
    userPostCode:                  string;
    userCity:                      string;
    userCountry:                   string;
    userCompany:                   string;
    orderShirtPaid:                boolean;
    orderFramePaid:                boolean;
    orderFraming:                  boolean;
    orderFramingStatus:            number;
    orderPaymentReminder:          number;
    orderAddressReminder:          number;
    orderShippingCosts:            number;
    orderPaymentCosts:             number;
    orderShippingStatus:           number;
    orderID:                       number;
    orderCreationDate:             Date;
    orderCertificateNumber:        number;
    orderNotes:                    string;
    orderFramingPurchaseOptionsID: number;
    matchID:                       number;
    matchDate:                     Date;
    clubName:                      string;
    clubID:                        number;
}
