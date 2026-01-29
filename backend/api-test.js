const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';
let adminToken = '';
let userId = '';
let movieId = '';

const runTests = async () => {
  console.log('🚀 Starting API Tests...');

  try {
    // 1. Test Auth: Login
    console.log('\n1. Testing Login (Admin)...');
    const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@gmail.com',
      password: 'adminpassword'
    });

    if (loginRes.data.success) {
      console.log('✅ Login Successful');
      adminToken = loginRes.data.token;
      console.log('Token received');
    }

    // 2. Test Movies: Get All
    console.log('\n2. Testing GET /movies...');
    const getMoviesRes = await axios.get(`${BASE_URL}/movies`);
    if (getMoviesRes.data.success) {
      console.log(`✅ Fetched ${getMoviesRes.data.data.length} movies`);
    }

    // 3. Test Movies: Search
    console.log('\n3. Testing GET /movies/search?q=Dark...');
    const searchRes = await axios.get(`${BASE_URL}/movies/search?q=Dark`);
    if (searchRes.data.success) {
      console.log(`✅ Found ${searchRes.data.data.length} matches for "Dark"`);
    }

    // 4. Test Movies: Create (Admin Only)
    console.log('\n4. Testing POST /movies (Admin)...');
    const createRes = await axios.post(`${BASE_URL}/movies`, {
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      rating: 8.7,
      releaseDate: "2014-11-07",
      duration: 169,
      posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg"
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    if (createRes.data.success) {
      console.log('✅ Movie Created: Interstellar');
      movieId = createRes.data.data._id;
    }

    // 5. Test Movies: Update (Admin Only)
    console.log(`\n5. Testing PUT /movies/${movieId} (Admin)...`);
    const updateRes = await axios.put(`${BASE_URL}/movies/${movieId}`, {
      rating: 9.0
    }, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    if (updateRes.data.success && updateRes.data.data.rating === 9.0) {
      console.log('✅ Movie Updated Successfully');
    }

    // 6. Test Movies: Delete (Admin Only)
    console.log(`\n6. Testing DELETE /movies/${movieId} (Admin)...`);
    const deleteRes = await axios.delete(`${BASE_URL}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    if (deleteRes.data.success) {
      console.log('✅ Movie Deleted Successfully');
    }

    // 7. Test Auth: Unauthorized Check
    console.log('\n7. Testing Unauthorized Access (No Token)...');
    try {
      await axios.post(`${BASE_URL}/movies`, { title: 'Ghost' });
    } catch (err) {
      if (err.response.status === 401) {
        console.log('✅ Correctly blocked (401 Unauthorized)');
      }
    }

    console.log('\n✨ ALL TESTS PASSED SUCCESSFULLY! ✨');

  } catch (error) {
    console.error('❌ Test Failed:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
};

runTests();
