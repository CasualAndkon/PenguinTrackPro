// admin.js

// Import Chart.js
import Chart from 'chart.js';

// Login Functionality
const login = async (username, password) => {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        if (!response.ok) throw new Error('Login failed');
        const data = await response.json();
        // Handle successful login (e.g., redirect to dashboard)
        console.log('Login successful:', data);
    } catch (error) {
        console.error('Error during login:', error);
    }
};

// Orders Management
const getOrders = async () => {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        // Process and display orders in the UI
        console.log('Orders:', orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
    }
};

// Appointments Management
const getAppointments = async () => {
    try {
        const response = await fetch('/api/appointments');
        const appointments = await response.json();
        // Process and display appointments in the UI
        console.log('Appointments:', appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
    }
};

// Revenue Pie Chart
const renderRevenueChart = (data) => {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Revenue Distribution',
                data: data.values,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        }
    });
};

// Example Initialization Function
const initAdminDashboard = async () => {
    await getOrders();
    await getAppointments();
    renderRevenueChart({
        labels: ['Product A', 'Product B', 'Service C'],
        values: [300, 500, 200]
    });
};

// Run initialization
initAdminDashboard();