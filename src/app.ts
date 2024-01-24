import * as SDKClient from '@lalamove/lalamove-js';

const sdkClient = new SDKClient.ClientModule(
  new SDKClient.Config(process.env.API_KEY, process.env.SECRET, 'sandbox')
);
const MARKET = 'TH';

const createQuotation = async () => {
  const co1 = {
    lat: '13.746749161242487',
    lng: '100.53463707096196',
  };

  const co2 = {
    lat: '13.737977131828037',
    lng: '100.56086172837297',
  };

  // const co3 = {
  //   lat: '13.75780408295424',
  //   lng: '100.56688941390526',
  // };

  const stop1 = {
    coordinates: co1,
    address: 'Siam Paragon',
  };

  const stop2 = {
    coordinates: co2,
    address: 'Terminal 21',
  };

  // const stop3 = {
  //   coordinates: co3,
  //   address: 'Jodd fair rama 9',
  // };

  const quotationPayload = SDKClient.QuotationPayloadBuilder.quotationPayload()
    .withLanguage('th_TH')
    .withServiceType('MOTORCYCLE')
    .withStops([stop1, stop2])
    /*
      optional fields
    */
    .withSpecialRequests(['FOOD_DELIVERY'])
    .withIsRouteOptimized(true)
    .withItem({
      quantity: '2',
      weight: 'LESS_THAN_3KG',
      categories: ['FOOD_DELIVERY'],
      handlingInstructions: ['HANDLE_WITH_CARE'],
    })
    .build();

  return sdkClient.Quotation.create(MARKET, quotationPayload);
};

const createOrder = async (quotation: SDKClient.IQuotation) => {
  const orderPayload = SDKClient.OrderPayloadBuilder.orderPayload()
    .withQuotationID(quotation.id)
    .withSender({
      stopId: quotation.stops[0].id,
      name: 'Michal',
      phone: '+66810234543',
    })
    .withRecipients([
      {
        stopId: quotation.stops[1].id,
        name: 'Rachel',
        phone: '+66646951955',
        remarks:
          'Condo opposite the Terminal21 shopping mall \r\nPlease call before delivery, thanks',
      },
    ])
    /*
      optional fields
    */
    .withIsPODEnabled(true)
    .withMetadata({
      orderId: 'order-xxx',
      merchantName: 'Tim Hortons',
      outletName: 'Samyarn Mitrtown',
    })
    .build();
  return sdkClient.Order.create(MARKET, orderPayload);
};

const cancelOrder = async (orderId: string) => {
  return sdkClient.Order.cancel(MARKET, orderId);
};

const mainFunction = async () => {
  const quotaion = await createQuotation();
  console.log(quotaion);

  const order = await createOrder(quotaion);
  console.log(order);

  const cancelledOrder = await cancelOrder(order.id);
  console.log(cancelledOrder);
};

mainFunction();
