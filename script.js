window.jsPDF = window.jspdf.jsPDF;

async function generatePDF() {
    GenerateBiodata();

    const name = v("fullName");
    const age = v("age");
    const dob = v("dob");
    const height = v("height");
    const religion = v("religion");
    const about = v("aboutme");

    const father = v("fatherName");
    const mother = v("motherName");
    const siblings = v("siblings");

    const phone = v("phone");
    const email = v("email");
    const address = v("address");

    const photoFile = document.getElementById("photo").files[0];

    const doc = new jsPDF("p", "pt", "a4");

    // Background
    doc.setFillColor("#fdf6ee");
    doc.rect(0, 0, 595, 842, "F");

    // Header Bar
    doc.setFillColor("#ff7b00");
    doc.rect(0, 0, 595, 80, "F");

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor("#fff");
    doc.text("Marriage Biodata", 200, 50);

    // --- LAYOUT COORDINATES ---
    const leftX = 40;
    let y = 110;

    // PHOTO SECTION (RIGHT)
    if (photoFile) {
        const img = await fileToBase64(photoFile);

        // Professional Photo Frame
        doc.setFillColor("#ffffff");
        doc.roundedRect(380, 110, 170, 220, 10, 10, "F");

        // Perfect aspect-ratio photo
        doc.addImage(img, "JPEG", 390, 120, 150, 200);
    }

    // --- SECTION MAKER ---
    function section(title) {
        doc.setFillColor("#ffe9cc");
        doc.roundedRect(leftX - 10, y, 330, 28, 6, 6, "F");

        doc.setFont("Helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor("#ff7b00");
        doc.text(title, leftX, y + 18);

        y += 45;

        doc.setFont("Helvetica", "normal");
        doc.setFontSize(13);
        doc.setTextColor("#444");
    }

    // --- BULLET MAKER ---
    function bullet(text) {
        doc.circle(leftX + 2, y - 4, 2, "F");
        doc.text(text, leftX + 12, y);
        y += 20;
    }

    // PERSONAL DETAILS
    section("Personal Details");
    bullet(`Name: ${name}`);
    bullet(`Age: ${age}`);
    bullet(`Date of Birth: ${dob}`);
    bullet(`Height: ${height}`);
    bullet(`Religion: ${religion}`);

    // ABOUT ME
    section("About Me");
    doc.text(doc.splitTextToSize(about, 350), leftX + 10, y);
    y += doc.getTextDimensions(about).h + 25;

    // FAMILY
    section("Family Background");
    bullet(`Father: ${father}`);
    bullet(`Mother: ${mother}`);
    bullet(`Siblings: ${siblings}`);

    // CONTACT
    section("Contact Details");
    bullet(`Phone: ${phone}`);
    bullet(`Email: ${email}`);
    doc.text(doc.splitTextToSize(`Address: ${address}`, 350), leftX + 12, y);
    y += 40;

    // Save PDF
    doc.save(`${name}-Biodata.pdf`);
}

function v(id) {
    return document.getElementById(id).value.trim();
}

function fileToBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

async function GenerateBiodata() {
   alert("Generating Biodata ")
    const data = {
        fullName: v("fullName"),
        age: v("age"),
        dob: v("dob"),
        height: v("height"),
        religion: v("religion"),
        about: v("aboutme"),

        fatherName: v("fatherName"),
        motherName: v("motherName"),
        siblings: v("siblings"),

        phone: v("phone"),
        email: v("email"),
        address: v("address")
    };

    try {
        const res = await fetch("https://mytools.sadiktamboli57.workers.dev/append", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const output = await res.text();

        console.log("Biodata generated with :", output);
        
    } 
    catch (err) {
        console.error(err);
        
    }
}
