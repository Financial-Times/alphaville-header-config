module.exports = {
	navItems: [
		{
			name: "Home",
			url: "/"
		},
		{
			name: "Markets Live",
			url: "/marketslive",
			lozenge: true
		},
		{
			name: "The Long Room",
			url: "/longroom"
		}
	],
	meganavSections: [
		{
			title: "Top sections",
			meganavSectionItems: [
				{
					name: "FT.com home",
					url: "http://www.ft.com"
				},
				{
					name: "Home",
					url: "/",
					expandable: true,
					id: 'the_blog',
					items: [
						{
							name: "Death of Banks",
							url: "#"
						},
						{
							name: "Alphachat",
							url: "#"
						},
						{
							name: "BitcoinMania",
							url: "#"
						},
						{
							name: "Meet the Team",
							url: "#"
						},
						{
							name: "About FTAV",
							url: "#"
						}
					]
				},
				{
					name: "Markets Live",
					url: "/marketslive",
					lozenge: true
				},
				{
					name: "The Long Room",
					url: "/longroom"
				}
			]
		}
	],
	userNav: [
		{
			name: "Sign In",
			url: "https://accounts.ft.com/login",
			liClass: "av2-logged-in-hidden",
			attributes: "data-av2-url-referrer=\"location\" data-av2-url-referrer-value=\"current_location\""
		},
		{
			name: "Subscribe",
			url: "http://registration.ft.com/registration/subscription-service/bpsp?segid=70152",
			liClass: "av2-logged-in-hidden"
		},
		{
			name: "Sign out",
			url: "https://accounts.ft.com/logout",
			liClass: "av2-logged-out-hidden",
			attributes: "data-av2-url-referrer=\"location\" data-av2-url-referrer-value=\"home_location\""
		},
		{
			name: "My Account",
			url: "https://registration.ft.com/registration/selfcare/",
			liClass: "av2-logged-out-hidden"
		}
	]
};
