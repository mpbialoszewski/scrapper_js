const axios = require('axios');
const cheerio = require('cheerio');
const Knwl = require('knwl.js');

// Mock axios get function
jest.mock('axios');
axios.get.mockResolvedValue({
  status: 200,
  data: '<html><body>Content</body></html>'
});