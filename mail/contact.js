$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true);

            $.ajax({
                url: "contact.php",
                type: "POST",
                data: {
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                },
                cache: false,
                success: function () {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-success')
                            .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                            .append('</div>');
                    $('#contactForm').trigger("reset");
                },
                error: function () {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                            .append("</button>");
                    $('#success > .alert-danger').append($("<strong>").text("Sorry " + name + ", it seems that our mail server is not responding. Please try again later!"));
                    $('#success > .alert-danger').append('</div>');
                    $('#contactForm').trigger("reset");
                },
                complete: function () {
                    setTimeout(function () {
                        $this.prop("disabled", false);
                    }, 1000);
                }
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});




document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Show the loading indicator
    document.getElementById("loading").style.display = "block"; 

    // Collect form data using FormData
    var formData = new FormData(this);

    // Send the form data using Fetch API
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then((response) => {
        // Hide loading indicator
        document.getElementById("loading").style.display = "none"; 
        
        if (response.ok) {
            // Display success message and hide error message
            document.getElementById("successMessage").style.display = "block";
            document.getElementById("errorMessage").style.display = "none";

            // Optionally, reset the form fields after successful submission
            document.getElementById("contactForm").reset();
        } else {
            // Display error message if the response is not OK
            document.getElementById("errorMessage").style.display = "block";
        }
    })
    .catch((error) => {
        // Hide loading indicator
        document.getElementById("loading").style.display = "none"; 

        // Display error message for network issues
        document.getElementById("errorMessage").style.display = "block";
        console.error("Error:", error); // Log error details to the console
    });
});
