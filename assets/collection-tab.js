const collectionTab = document.querySelector(".collection-tab-section .collection");
const sectionIddd = collectionTab.getAttribute("data-id");

if (collectionTab) {
  const collectionButtons = collectionTab.querySelectorAll('.collection-tab-list .button');

  collectionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      collectionButtons.forEach((btn) => {
        btn.classList.remove('button--primary');
        btn.classList.add('button--secondary');
      });

      button.classList.add('button--primary');
      button.classList.remove('button--secondary');

      const selectedHandle = button.dataset.collectionHandle;
      if (selectedHandle) {
        collection(selectedHandle);
      }
    });
  });
}

async function collection(handle) {
  const collectionContainer = document.getElementById('collection-data-' + sectionIddd);

  // Show loader while waiting for data
  collectionContainer.innerHTML = `
    <div class="collection-loader" style="text-align: center; padding: 2rem;">
      Loading...
    </div>
  `;

  try {
    const res = await fetch(`${handle}/?section_id=${sectionIddd}`);
    const responseText = await res.text();

    const responseHTML = new DOMParser().parseFromString(responseText, "text/html");
    const collectionDataElement = responseHTML.querySelector(`#collection-data-${sectionIddd}`);

    if (collectionDataElement) {
      collectionContainer.innerHTML = collectionDataElement.innerHTML;
    } else {
      collectionContainer.innerHTML = `<p style="text-align:center;">Failed to load collection.</p>`;
    }

  } catch (error) {
    console.error("Error loading collection:", error);
    collectionContainer.innerHTML = `<p style="text-align:center;">Something went wrong. Please try again later.</p>`;
  }
}
