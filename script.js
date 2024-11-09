document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.target);

  console.log("Form Data Submitted:", formData); // Log form data to check

  fetch('/submit', {
    method: 'POST',
    body: formData
  })
  .then(response => {
    console.log("Response Status:", response.status);  // Log response status

    if (response.ok) {
      return response.text();  // If successful, extract text from response
    } else {
      throw new Error('Form submission failed');
    }
  })
  .then(data => {
    console.log("Server Response:", data);  // Log the server response
    alert(data); // Show success message in alert
    document.getElementById("contactForm").reset(); // Optional: Reset form fields
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an error submitting your message. Please try again later.');
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

