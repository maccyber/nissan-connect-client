import axios from 'axios'
import { NissanConnectClient } from '../src/NissanConnectClient';
import MockAdapter from 'axios-mock-adapter';
import ApiPaths from '../src/nissan-connect/ApiPaths'
import vehicleResponse from './response/vehicleResponse'
import sessionResponse from './response/sessionResponse'
import batteryStatusRecordsResponse from './response/batteryStatusRecordsResponse'
import remoteACRecordsResponse from './response/remoteACRecordsResponse'

const mockAxiosInstance = new MockAdapter(axios);

const nissanConnectClient = new NissanConnectClient({});

describe('NissanConnectClient', () => {
  describe('login()', () => {
    it('should successfully log in', async () => {
      mockAxiosInstance.onPost(ApiPaths.initialApp).reply(200, sessionResponse({}));
      mockAxiosInstance.onPost(ApiPaths.userLoginRequest).reply(200, vehicleResponse());

      const response = await nissanConnectClient.login('username', 'password');

      const expectedReponse = [{ "nickname": "Leaf1Car", "vin": "4Y1SL65848Z411439" }]
      expect(response).toEqual(expectedReponse);
    });

    it('should throw an error when connect fails', async () => {
      mockAxiosInstance.onPost(ApiPaths.initialApp).reply(401, sessionResponse({
        status: 404,
        message: 'INVALID_PARAMS',
        baseprm: ''
      }));

      await expect(nissanConnectClient.login('should', 'fail')).rejects.toThrow('Failed to login');
    });
  });

  describe('batteryStatus()', () => {
    it('should return cached battery status', async () => {
      mockAxiosInstance.onPost(ApiPaths.initialApp).reply(200, sessionResponse({}));
      mockAxiosInstance.onPost(ApiPaths.userLoginRequest).reply(200, vehicleResponse());
      mockAxiosInstance.onPost(ApiPaths.batteryStatusRecordsRequest).reply(200, batteryStatusRecordsResponse());

      const vehicleInfo = await nissanConnectClient.login('username', 'password');

      const batteryStatusResponse = await nissanConnectClient.batteryStatus(vehicleInfo[0].vin);

      expect(batteryStatusResponse.pluginState).toEqual('NOT_CONNECTED');
    });
  });

  describe('climateControlStatus', () => {
    it('should return climate control status', async () => {
      mockAxiosInstance.onPost(ApiPaths.initialApp).reply(200, sessionResponse({}));
      mockAxiosInstance.onPost(ApiPaths.userLoginRequest).reply(200, vehicleResponse());
      mockAxiosInstance.onPost(ApiPaths.remoteACRecordsRequest).reply(200, (remoteACRecordsResponse()));

      const vehicleInfo = await nissanConnectClient.login('username', 'password');

      const climateControlStatusResponse = await nissanConnectClient.climateControlStatus(vehicleInfo[0].vin);

      expect(climateControlStatusResponse).toEqual({ status: 'off' });
    });
  });

  describe('climateControlTurnOn', () => {
    it('should turn on climate control', async () => {
      mockAxiosInstance.onPost(ApiPaths.initialApp).reply(200, sessionResponse({}));
      mockAxiosInstance.onPost(ApiPaths.userLoginRequest).reply(200, vehicleResponse());
      mockAxiosInstance.onPost(ApiPaths.acRemoteRequest).reply(200, { status: 'success' });

      const vehicleInfo = await nissanConnectClient.login('username', 'password');

      const climateControlTurnOnResponse = await nissanConnectClient.climateControlTurnOn(vehicleInfo[0].vin);

      expect(climateControlTurnOnResponse).toEqual({ status: 'success' });
    });
  });

  describe('climateControlTurnOff', () => {
    it('should turn off climate control', async () => {
      mockAxiosInstance.onPost(ApiPaths.initialApp).reply(200, sessionResponse({}));
      mockAxiosInstance.onPost(ApiPaths.userLoginRequest).reply(200, vehicleResponse());
      mockAxiosInstance.onPost(ApiPaths.acRemoteOffRequest).reply(200, { status: 'success' });

      const vehicleInfo = await nissanConnectClient.login('username', 'password');

      const climateControlTurnOffResponse = await nissanConnectClient.climateControlTurnOff(vehicleInfo[0].vin);

      expect(climateControlTurnOffResponse).toEqual({ status: 'success' });
    });
  });
});
