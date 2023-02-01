import datetime

import requests

from utils.compute_useful_coins import coins


def get_custom_rate_now(coin: str):
    if not any(c['id'] == coin for c in coins):
        return -1
    url = f'https://api.coingecko.com/api/v3/coins/{coin}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false'
    response = requests.get(url)
    if "market_data" not in response.json():
        return -2
    coin_details = {
        "name": coin,
        "symbol": response.json()["symbol"],
        "current_price": {
            "eur": response.json()["market_data"]["current_price"]["eur"],
            "usd": response.json()["market_data"]["current_price"]["usd"]
        }
    }
    return coin_details


def get_last_days_exchange(coin: str, days: int):
    if not any(c['id'].lower() == coin.lower() for c in coins):
        return -1
    current_day = datetime.datetime.now()
    time = [current_day - datetime.timedelta(days=day) for day in range(days)]
    dates = [
        f'{day.day if day.day > 9 else "0" + str(day.day)}-{day.month if day.month > 9 else "0" + str(day.month)}-{day.year}'
        for day in time]
    response = {
        "name": coin,
        "prices": [
        ]
    }
    for date in dates:
        url = f'https://api.coingecko.com/api/v3/coins/{coin}/history?date={date}&localization=false'
        resp = requests.get(url)
        if 'market_data' not in resp.json():
            return -2
        response['prices'].append({
            'date': date,
            'eur': resp.json()["market_data"]["current_price"]["eur"],
            "usd": resp.json()["market_data"]["current_price"]["usd"]
        })
    print(response)
    return response
