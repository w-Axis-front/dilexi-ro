export default function scrollContent() {
	// Add smooth scrolling to all links:
	if ($("a").length > 0) {
		$("a").on("click", function (event) {
			if (this.hash !== "") {
				event.preventDefault();
				let hash = this.hash;

				$("html, body").animate(
					{
						scrollTop: $(hash).offset().top
					},
					800
				);
			}
		});
	}
}
