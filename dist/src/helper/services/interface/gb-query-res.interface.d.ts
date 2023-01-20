export interface ResGBPayQuery {
    resultCode: string;
    txn: ResGBPayQueryTxn;
    resultMessage: string;
}
export interface ResGBPayQueryTxn {
    amount: string;
    referenceNo: string;
    gbpReferenceNo: string;
    merchantDefined5: string;
    merchantDefined3: string;
    merchantDefined4: string;
    merchantDefined1: string;
    status: string;
    paymentType: string;
    merchantDefined2: string;
    date?: string;
    resultCode?: string;
    totalAmount?: string;
    thbAmount?: string;
    time?: string;
    currencyCode?: string;
}
