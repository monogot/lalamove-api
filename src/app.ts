import * as SDKClient from '@lalamove/lalamove-js';

const sdkClient = new SDKClient.ClientModule(
  new SDKClient.Config(process.env.API_KEY, process.env.SECRET, 'sandbox')
);

const createQuotation = async () => {
  const co1 = {
    lat: '13.746749161242487',
    lng: '100.53463707096196',
  };

  const co2 = {
    lat: '13.737977131828037',
    lng: '100.56086172837297',
  };

  const stop1 = {
    coordinates: co1,
    address: 'Siam Paragon',
  };

  const stop2 = {
    coordinates: co2,
    address: 'Terminal 21',
  };

  const quotationPayload = SDKClient.QuotationPayloadBuilder.quotationPayload()
    .withLanguage('th_TH')
    .withServiceType('MOTORCYCLE')
    .withStops([stop1, stop2])
    .build();

  return sdkClient.Quotation.create('TH', quotationPayload);
};

const mainFunction = async () => {
  const quotaion = await createQuotation();
  console.log(quotaion);
};

mainFunction();
