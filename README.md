# link for Redis db
https://drive.google.com/file/d/1_mtkpKJOvOnI7oIThKrGPQ_RsmRD9yBv/view?usp=drive_link


onst mockRequest = (options) => ({
  // Common request properties to mock
  params: options.params || {},
  query: options.query || {},
  body: options.body || {},
  headers: options.headers || {},
  ...options, // Allow overriding any property
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res); // Mock status and allow chaining
  res.json = jest.fn().mockReturnValue(res);   // Mock json and allow chaining
  res.send = jest.fn().mockReturnValue(res);   // Mock send and allow chaining
  res.redirect = jest.fn();
  // Add other methods as needed
  return res;
};

// Example usage in a test:
const req = mockRequest({ params: { id: '123' }, body: { name: 'Test' } });
const res = mockResponse();
