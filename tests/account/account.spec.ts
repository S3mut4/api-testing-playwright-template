import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { AccountDto } from '../dto/account-dto'

test('get account with correct id should response code 200', async ({ request }) => {
  // Send a GET request to the server
  const response = await request.get('https://shop.tl-academy.ee/api/accounts/1', {
    headers: { 'X-API-KEY': 'my-api-key' },
  })

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  expect(statusCode).toBe(StatusCodes.OK)
})

test('create account with correct payload id should response code 201', async ({ request }) => {
  // Send a GET request to the server
  const response = await request.post('https://shop.tl-academy.ee/api/accounts', {
    headers: { 'X-API-KEY': 'my-api-key' },
    //define payload
    data: new AccountDto('Mark', 'USD'),
  })

  // parse raw response body to json
  const responseBody = await response.json()
  const statusCode = response.status()
  const acountId = responseBody.id

  // Log the response status and body
  console.log('response status:', statusCode)
  console.log('response body:', responseBody)
  console.log('response id:', acountId)
  expect(statusCode).toBe(StatusCodes.CREATED)

  //Step 2 deposit account we just created
  const responseDeposit = await request.post(
    `https://shop.tl-academy.ee/api/accounts/${acountId}/deposit`,
    {
      headers: { 'X-API-KEY': 'my-api-key' },
      //define payload
      data: { amount: 25.5 },
    },
  )
  const responseBodyDeposit = await responseDeposit.json()
  const depositstatusCode = responseDeposit.status()
  console.log('response status:', depositstatusCode)
  console.log('response body:', responseBodyDeposit)
})
