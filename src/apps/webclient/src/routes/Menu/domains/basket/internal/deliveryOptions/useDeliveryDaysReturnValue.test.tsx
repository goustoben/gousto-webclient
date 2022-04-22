import { renderHook } from '@testing-library/react-hooks'
import useSWR from 'swr'
import { useDeliveryDays } from '.'

jest.mock('swr', () => jest.fn())
jest.mock('utils/configFromWindow', () => ({
  getClientEnvironment: () => 'local',
  getClientDomain: () => 'gousto.local',
}))

const mockedUseSWR = useSWR as jest.MockedFunction<any>

describe('useDeliveryDays', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when server response with valid data', () => {
    mockedUseSWR.mockReturnValue({
      data: {
        data: [
          {
            id: '9a740f09-4545-4994-bc04-0fe1aba8d219',
            date: '2021-12-24',
            is_default: false,
            core_day_id: '2697',
            unavailable_reason: '',
            alternate_delivery_day: null,
            slots: [
              {
                id: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
                default_day: 5,
                core_slot_id: '4',
                delivery_start_time: '08:00:00',
                delivery_end_time: '19:00:00',
                cutoff_day: 2,
                cutoff_time: '11:59:59',
                delivery_price: '0.00',
                is_default: true,
                when_cutoff: '2021-12-21T11:59:59+00:00',
              },
            ],
            day_slots: [
              {
                id: '5706',
                day_id: '9a740f09-4545-4994-bc04-0fe1aba8d219',
                slot_id: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
                when_cutoff: '2021-12-21T11:59:59+00:00',
                unavailable_reason: '',
                alternate_day: null,
                active_for_subscribers_one_off: true,
                active_for_non_subscribers_one_off: true,
                active_for_signups: true,
              },
            ],
          },
        ],
      },
    })

    it('should should convert it into necessary shape', async () => {
      const {
        result: { current },
      } = renderHook(() =>
        useDeliveryDays({
          accessToken: 'access token',
          cutoffFrom: '2021-12-21T00:00:00',
          cutoffUntil: '2021-12-31T23:59:59',
          deliveryTariffId: 'tariff ID',
          isNDDExperiment: false,
          userId: 'user one',
          usersOrdersDaySlotLeadTimeIds: [],
          postcode: 'RH19 1AA',
        }),
      )

      expect(current).toEqual({
        days: {
          '2021-12-24': {
            alternateDeliveryDay: null,
            coreDayId: '2697',
            date: '2021-12-24',
            daySlots: [
              {
                activeForNonSubscribersOneOff: true,
                activeForSignups: true,
                activeForSubscribersOneOff: true,
                alternateDay: null,
                dayId: '9a740f09-4545-4994-bc04-0fe1aba8d219',
                id: '5706',
                slotId: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
                unavailableReason: '',
                whenCutoff: '2021-12-21T11:59:59+00:00',
              },
            ],
            id: '9a740f09-4545-4994-bc04-0fe1aba8d219',
            isDefault: false,
            slots: [
              {
                coreSlotId: '4',
                cutoffDay: 2,
                cutoffTime: '11:59:59',
                defaultDay: 5,
                deliveryEndTime: '19:00:00',
                deliveryPrice: '0.00',
                deliveryStartTime: '08:00:00',
                id: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
                isDefault: true,
                whenCutoff: '2021-12-21T11:59:59+00:00',
              },
            ],
            unavailableReason: '',
          },
        },
        error: undefined,
      })
    })
  })
})
