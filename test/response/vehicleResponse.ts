import { type IVehicleResponse } from '../../src'

export default function (vin: string = '4Y1SL65848Z411439'): IVehicleResponse {
  return {
    status: 200,
    sessionId: '34e423da-d0e2-4bf9-b39d-ab0b010e5a13',
    VehicleInfoList: {
      VehicleInfo: [
        {
          nickname: 'Leaf1Car',
          telematicsEnabled: 'true',
          vin
        }
      ],
      vehicleInfo: [
        {
          nickname: 'Leaf1Car',
          telematicsEnabled: 'true',
          vin,
          custom_sessionid: 'G5HoddyOaoz0THyJvT42Ag44LzmYOKyHryfCKkLiXXq4Y1SL65848Z411439/qlBRNrrlDiCnYTOIGSGtfqnequnsVA=='
        }
      ]
    },
    vehicle: {
      profile: {
        vin,
        gdcUserId: '',
        gdcPassword: '',
        encAuthToken: '7A9E2D6F1B8C4A0E3D5F242C4B1A6E3F4B9D2A8F0E5D3B7',
        dcmId: '203570502171',
        nickname: 'Leaf1Car',
        modelyear: '17'
      }
    },
    EncAuthToken: '7A9E2D6F1B8C4A0E3D5F2C4B1A6E3F4B9D2A8F0E5D3B7',
    CustomerInfo: {
      UserId: '42U1ZJ7K6IC6H142',
      Language: 'nb-NO',
      Timezone: 'Europe/Oslo',
      RegionCode: 'NE',
      OwnerId: '4032923100',
      EMailAddress: 'jonas.enge@gmail.com',
      Nickname: 'Leaf1Car',
      Country: 'NO',
      VehicleImage: '/content/language/default/images/img/ph_car.jpg',
      UserVehicleBoundDurationSec: '946771200',
      VehicleInfo: {
        VIN: vin,
        DCMID: '242422424242',
        SIMID: '42424242424242424242',
        NAVIID: '424242424242',
        EncryptedNAVIID: '4242B80DE379C222C11DEB73BA5D135E',
        MSN: '33684006268',
        LastVehicleLoginTime: '',
        UserVehicleBoundTime: '2019-11-20T16:19:16Z',
        LastDCMUseTime: '',
        NonaviFlg: 'false',
        CarName: 'LEAF',
        CarImage: 'carimg6.png'
      }
    },
    UserInfoRevisionNo: '2',
    ngTapUpdatebtn: '300000',
    timeoutUpdateAnime: '300000',
    G1Lw: '5',
    G1Li: '2',
    G1Lt: '20',
    G1Uw: '15',
    G1Ui: '2',
    G1Ut: '20',
    G2Lw: '15',
    G2Li: '2',
    G2Lt: '20',
    G2Uw: '15',
    G2Ui: '2',
    G2Ut: '20',
    resultKey: '42DDdp342Qw2q2PY2xV8nV3oFJB0mytuhwOLZSa2IxVZQKYsiTQvO42'
  }
};
