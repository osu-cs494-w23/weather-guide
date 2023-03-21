let scale = [
    {
        n: 0,
        speed: 0,
        wind: 'Calm',
        wave: '0',
        desc: 'Sea is like a mirror. Smoke rises vertically.'
    },
    {
        n: 1,
        speed: 1,
        wind: 'Light Air',
        wave: '< 1/2',
        desc: 'Ripples with the appearance of scales are formed, but without foam crests. Smoke drifts from funnel.'
    },
    {
        n: 2,
        speed: 4,
        wind: 'Light breeze',
        wave: '1/2 ft',
        desc: 'Small wavelets, still short but more pronounced, crests have glassy appearance and do not break. Wind felt on face. Smoke rises at about 80 degrees.'
    },
    {
        n: 3,
        speed: 7,
        wind: 'Gentle Breeze',
        wave: '2 ft',
        desc: 'Large wavelets, crests begin to break. Foam of glassy appearance. Perhaps scattered white horses (white caps). Wind extends light flag and pennants. Smoke rises at about 70 deg.'
    },
    {
        n: 4,
        speed: 11,
        wind: 'Moderate Breeze',
        wave: '3 ft',
        desc: 'Small waves, becoming longer. Fairly frequent white horses (white caps). Wind raises dust and loose paper on deck. Smoke rises at about 50 deg. No noticeable sound in the rigging. Slack halyards curve and sway. Heavy flag flaps limply.'
    },
    {
        n: 5,
        speed: 17,
        wind: 'Fresh Breeze',
        wave: '6 ft',
        desc: 'Moderate waves, taking more pronounced long form. Many white horses (white caps) are formed (chance of some spray). Wind felt strongly on face. Smoke rises at about 30 deg. Slack halyards whip while bending continuously to leeward. Taut halyards maintain slightly bent position. Low whistle in the rigging. Heavy flag doesnt extended but flaps over entire length'
    },{
        n: 6,
        speed: 22,
        wind: 'Strong Breeze',
        wave: '9 ft',
        desc: 'Large waves begin to form. White foam crests are more extensive everywhere (probably some spray). Wind stings face in temperatures below 35 deg F (2C). Slight effort in maintaining balance against wind. Smoke rises at about 15 deg. Both slack and taut halyards whip slightly in bent position. Low moaning, rather than whistle, in the rigging. Heavy flag extends and flaps more vigorously.'
    },{
        n: 7,
        speed: 28,
        wind: 'Near Gale',
        wave: '13 ft',
        desc: 'Sea heaps up and white foam from breaking waves begins to be blown in streaks along the direction of wind. Necessary to lean slightly into the wind to maintain balance. Smoke rises at about 5 to 10 deg. Higher pitched moaning and whistling heard from rigging. Halyards still whip slightly. Heavy flag extends fully and flaps only at the end. Oilskins and loose clothing inflate and pull against the body.'
    },
    {
        n: 8,
        speed: 34,
        wind: 'Gale',
        wave: '18 ft',
        desc: 'Moderately high waves of greater length. Edges of crests begin to break into the spindrift. The foam is blown in well-marked streaks along the direction of the wind. Head pushed back by the force of the wind if allowed to relax. Oilskins and loose clothing inflate and pull strongly. Halyards rigidly bent. Loud whistle from rigging. Heavy flag straight out and whipping.'
    },
    {
        n: 9,
        speed: 41,
        wind: 'Strong Gale',
        wave: '23 ft',
        desc: 'High waves. Dense streaks of foam along direction of wind. Crests of waves begin to topple, tumble and roll over. Spray may affect visibility.'
    },
    {
        n: 10,
        speed: 48,
        wind: 'Storm',
        wave: '29 ft',
        desc: 'Very high waves with long overhanging crests. The resulting foam, in great patches is blown in dense streaks along the direction of the wind. On the whole, the sea takes on a whitish appearance. Tumbling of the sea becomes heavy and shock-like. Visibility affected.'
    },
    {
        n: 11,
        speed: 56,
        wind: 'Violent Storm',
        wave: '37 ft',
        desc: 'Exceptionally high waves (small and medium-sized ships might be for time lost to view behind the waves). The sea is completely covered with long white patches of foam lying along the direction of the wind. Everywhere, the edges of the wave crests are blown into froth. Visibility greatly affected'
    },
    {
        n: 12,
        speed: 64,
        wind: 'Hurricane',
        wave: '45+ ft',
        desc: 'The air is filled with foam and spray. The sea is completely white with driving spray. Visibility is seriously affected.'
    },
]

export default scale
