// Import required dependencies
// import { type AxiosError } from 'axios';
const axios = require('axios');
const AxiosError = require('axios').AxiosError;
require('dotenv').config(); 

// Configuration options
const config = {
    // It's better to store API keys in environment variables
    apiKey: process.env.CMC_API_KEY || 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c',
    baseUrl: 'https://pro-api.coinmarketcap.com/v1',
    endpoints: {
        // Cryptocurrency endpoints
        listings: '/cryptocurrency/listings/latest',
        quotes: '/cryptocurrency/quotes/latest',
        info: '/cryptocurrency/info',
        map: '/cryptocurrency/map',
        marketPairs: '/cryptocurrency/market-pairs/latest',
        ohlcv: '/cryptocurrency/ohlcv/latest',
        pricePerformance: '/cryptocurrency/price-performance-stats/latest',
        
        // FIAT endpoints
        fiatMap: '/fiat/map',
        
        // Exchange endpoints
        exchangeListings: '/exchange/listings/latest',
        exchangeQuotes: '/exchange/quotes/latest',
        exchangeInfo: '/exchange/info',
        exchangeMap: '/exchange/map',
        
        // Global metrics endpoints
        globalMetrics: '/global-metrics/quotes/latest',
        
        // Tools endpoints
        priceConversion: '/tools/price-conversion',
        
        // Blockchain endpoints
        blockchainStatistics: '/blockchain/statistics/latest',
        
        // Key endpoints
        keyInfo: '/key/info',
        
        // Airdrops and categories
        airdrops: '/cryptocurrency/airdrops',
        categories: '/cryptocurrency/categories'
    }
};

// Create an axios instance with default configuration
const api = axios.create({
    baseURL: config.baseUrl,
    headers: {
        'X-CMC_PRO_API_KEY': config.apiKey,
        'Accept': 'application/json'
    }
});

// Function to fetch latest cryptocurrency listings
async function getLatestListings(params = {}) {
    try {
        // Add optional query parameters
        const defaultParams = {
            start: 1,
            limit: 10,
            convert: 'USD'
        };

        const response = await api.get(config.endpoints.listings, {
            params: { ...defaultParams, ...params }
        });

        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Function to fetch cryptocurrency quotes by symbol or ID
async function getCryptoQuotes(symbol: string, convert = 'USD') {
    try {
        const response = await api.get(config.endpoints.quotes, {
            params: {
                symbol: symbol,
                convert: convert
            }
        });

        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

async function getAirdrops(params = {}) {
    try {
        const defaultParams = {
            id: undefined,           // Optional: Filter by specific airdrop ID
            status: 'UPCOMING',      // UPCOMING, ONGOING, ENDED
            start: 1,               // Starting position for pagination
            limit: 100,             // Number of records per page (max 100)
            time_start: undefined,  // Optional: Filter by start time
            time_end: undefined     // Optional: Filter by end time
        };

        const response = await api.get(config.endpoints.airdrops, {
            params: { ...defaultParams, ...params }
        });

        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Get cryptocurrency metadata
async function getCryptoInfo(symbol: string) {
    try {
        const response = await api.get(config.endpoints.info, {
            params: { symbol }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Get cryptocurrency map
async function getCryptoMap(params = {}) {
    try {
        const defaultParams = {
            listing_status: 'active',
            start: 1,
            limit: 100
        };
        
        const response = await api.get(config.endpoints.map, {
            params: { ...defaultParams, ...params }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Get market pairs
async function getMarketPairs(symbol: string) {
    try {
        const response = await api.get(config.endpoints.marketPairs, {
            params: { symbol }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// FIAT Endpoints
async function getFiatMap(params = {}) {
    try {
        const defaultParams = {
            start: 1,
            limit: 100,
            sort: 'name'
        };
        
        const response = await api.get(config.endpoints.fiatMap, {
            params: { ...defaultParams, ...params }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Exchange Endpoints
async function getExchangeListings(params = {}) {
    try {
        const defaultParams = {
            start: 1,
            limit: 100,
            sort: 'volume_24h',
            sort_dir: 'desc',
            convert: 'USD'
        };
        
        const response = await api.get(config.endpoints.exchangeListings, {
            params: { ...defaultParams, ...params }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

async function getExchangeInfo(id: string) {
    try {
        const response = await api.get(config.endpoints.exchangeInfo, {
            params: { id }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Global Metrics Endpoints
async function getGlobalMetrics(convert = 'USD') {
    try {
        const response = await api.get(config.endpoints.globalMetrics, {
            params: { convert }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Price Conversion
async function getPriceConversion(amount: number, symbol: string, convert = 'USD') {
    try {
        const response = await api.get(config.endpoints.priceConversion, {
            params: {
                amount,
                symbol,
                convert
            }
        });
        return {
            success: true,
            data: response.data,
            status: response.status
        };
    } catch (error) {
        return {
            success: false,
            error: {
                message: (error as typeof AxiosError).message,
                response: (error as typeof AxiosError).response?.data,
                status: (error as typeof AxiosError).response?.status
            }
        };
    }
}

// Function to test the API
async function testAPI() {
    console.log('Testing CoinMarketCap API...\n');

    // Test cryptocurrency listings
    console.log('\nTest: Fetching cryptocurrency listings');
    const listingsResult = await getLatestListings();
    console.log('Status:', listingsResult.success ? 'SUCCESS' : 'FAILED');
    if (listingsResult.success) {
        console.log(`Retrieved ${listingsResult.data.data.length} cryptocurrencies`);
        console.log('First cryptocurrency:', listingsResult.data.data[0].name);
    } else {
        console.log('Error:', listingsResult.error?.message);
    }

    // Test cryptocurrency quotes
    console.log('\nTest: Fetching cryptocurrency quotes');
    const quotesResult = await getCryptoQuotes('BTC');
    console.log('Status:', quotesResult.success ? 'SUCCESS' : 'FAILED');
    if (quotesResult.success) {
        console.log('Bitcoin price:', quotesResult.data.data.BTC.quote.USD.price);
        console.log('Bitcoin market cap:', quotesResult.data.data.BTC.quote.USD.market_cap);
    } else {
        console.log('Error:', quotesResult.error?.message);
    }

    // Test cryptocurrency airdrops
    console.log('\nTest: Fetching cryptocurrency airdrops');
    const airdropsResult = await getAirdrops();
    console.log('Status:', airdropsResult.success ? 'SUCCESS' : 'FAILED');
    if (airdropsResult.success) {
        console.log('First airdrop:', airdropsResult.data.data[0].name);
    } else {
        console.log('Error:', airdropsResult.error?.message);
    }

    // Test cryptocurrency info
    console.log('\nTest: Fetching cryptocurrency info');
    const infoResult = await getCryptoInfo('BTC');
    console.log('Status:', infoResult.success ? 'SUCCESS' : 'FAILED');
    if (infoResult.success) {
        console.log('Bitcoin Info:', {
            name: infoResult.data.data.BTC.name,
            category: infoResult.data.data.BTC.category,
            description: infoResult.data.data.BTC.description?.slice(0, 100) + '...'
        });
    } else {
        console.log('Error:', infoResult.error?.message);
    }

    // Test cryptocurrency map
    console.log('\nTest: Fetching cryptocurrency map');
    const mapResult = await getCryptoMap({ limit: 5 });
    console.log('Status:', mapResult.success ? 'SUCCESS' : 'FAILED');
    if (mapResult.success) {
        console.log('First 5 mapped cryptocurrencies:');
        for (const crypto of mapResult.data.data) {
            console.log(`${crypto.name} (${crypto.symbol}): ID ${crypto.id}`);
        }
    } else {
        console.log('Error:', mapResult.error?.message);
    }

    // Test market pairs
    console.log('\nTest: Fetching market pairs');
    const pairsResult = await getMarketPairs('BTC');
    console.log('Status:', pairsResult.success ? 'SUCCESS' : 'FAILED');
    if (pairsResult.success) {
        console.log('Number of market pairs:', pairsResult.data.data.num_market_pairs);
        console.log('First market pair:', pairsResult.data.data.market_pairs[0]);
    } else {
        console.log('Error:', pairsResult.error?.message);
    }

    // Test FIAT Map
    console.log('\nTest: Fetching FIAT map');
    const fiatResult = await getFiatMap({ limit: 5 });
    console.log('Status:', fiatResult.success ? 'SUCCESS' : 'FAILED');
    if (fiatResult.success) {
        console.log('First 5 FIAT currencies:');
        for (const fiat of fiatResult.data.data) {
            console.log(`${fiat.name} (${fiat.symbol}): ID ${fiat.id}`);
        }
    } else {
        console.log('Error:', fiatResult.error?.message);
    }

    // Test Exchange Listings
    console.log('\nTest: Fetching exchange listings');
    const exchangeResult = await getExchangeListings({ limit: 5 });
    console.log('Status:', exchangeResult.success ? 'SUCCESS' : 'FAILED');
    if (exchangeResult.success) {
        console.log('Top 5 exchanges by volume:');
        for (const exchange of exchangeResult.data.data) {
            console.log(`${exchange.name}: Volume 24h $${exchange.quote.USD.volume_24h}`);
        }
    } else {
        console.log('Error:', exchangeResult.error?.message);
    }

    // Test Global Metrics
    console.log('\nTest: Fetching global metrics');
    const metricsResult = await getGlobalMetrics();
    console.log('Status:', metricsResult.success ? 'SUCCESS' : 'FAILED');
    if (metricsResult.success) {
        const metrics = metricsResult.data.data;
        console.log('Global Market Cap:', metrics.quote.USD.total_market_cap);
        console.log('Total Volume 24h:', metrics.quote.USD.total_volume_24h);
    } else {
        console.log('Error:', metricsResult.error?.message);
    }

    // Test Price Conversion
    console.log('\nTest: Testing price conversion');
    const conversionResult = await getPriceConversion(1, 'BTC', 'USD');
    console.log('Status:', conversionResult.success ? 'SUCCESS' : 'FAILED');
    if (conversionResult.success) {
        console.log('1 BTC =', conversionResult.data.data.quote.USD.price, 'USD');
    } else {
        console.log('Error:', conversionResult.error?.message);
    }
}

// Execute the tests
testAPI().then(() => {
    console.log('\nAPI testing completed');
}).catch(error => {
    console.error('Unexpected error:', error);
});

// Export functions for use in other files if needed
module.exports = {
    getLatestListings,
    getCryptoQuotes,
    getAirdrops,
    getCryptoInfo,
    getCryptoMap,
    getMarketPairs,
    getFiatMap,
    getExchangeListings,
    getExchangeInfo,
    getGlobalMetrics,
    getPriceConversion,
    testAPI
};