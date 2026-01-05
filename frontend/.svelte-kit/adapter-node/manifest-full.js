export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["480253574_519592814503843_155183674564057428_n.jpg","480317284_518811524581972_8702244260541387801_n.jpg","480451313_519582431171548_3309691283841879797_n.jpg","480550232_520175491112242_6056627001798457656_n.jpg","524995421_644440205352436_4882444495617867150_n.jpg","camps/478278206_518114947984963_3727456241404200799_n.jpg","camps/479544477_516514228145035_3370660487461680180_n.jpg","camps/480541685_525020913961033_7575004528192900917_n.jpg","camps/480828745_525012433961881_1776206399951794533_n.jpg","camps/485693359_545062581956866_8217956033877381566_n.jpg","camps/510558630_616454818150975_2848625339731913587_n.jpg","camps/511562436_618032664659857_2760144674956014663_n.jpg","camps/537378575_666839196445870_7205819773690376839_n.jpg","camps/538546293_666839159779207_5349435575611989785_n.jpg","camps/565101131_710263548770101_4822435177271192086_n.jpg","home.png","img-communes/515983768_627785960351194_4348364861543239483_n.jpg","img-communes/516337717_627784830351307_5152799833071558855_n.jpg","img-communes/516742094_627786453684478_657473613053056506_n.jpg","img-communes/516789178_627785197017937_846098650229137324_n.jpg","img-communes/516872493_627785213684602_5808429210444116953_n.jpg","img-communes/518277984_638504135946043_2428705474278360863_n.jpg","img-communes/518374491_638504155946041_7470751988533035423_n.jpg","img-communes/518390610_631699866626470_5436715147259239959_n.jpg","img-communes/570370526_720083157788140_3459994557698679766_n.jpg","img-communes/equipe.jpg","img-communes/famille.jpg","img-communes/favicon.svg","img-communes/fond.png","img-communes/fondgazon.jpg","img-communes/fondlog.png","img-communes/fondneutre.png","img-communes/fondteam.jpeg","img-communes/gazon.jpg","img-communes/profil.png","juniors/492689567_573257355804055_1461324360290593799_n.jpg","juniors/496786115_585880524541738_8840125093257429372_n.jpg","juniors/535057118_663522866777503_4651670088385010660_n.jpg","juniors/537967620_666839376445852_6915113188534630892_n.jpg","juniors/548012673_685056314624158_4870670771819232574_n.jpg","juniors/550883180_686037901192666_8182824424362122854_n.jpg","juniors/559248836_705559512573838_3984312377351754942_n.jpg","juniors/560278003_705559722573817_6191104400376258553_n.jpg","juniors/571179539_720082317788224_4350099172939943278_n.jpg","juniors/571342279_720630184400104_6686152432181470303_n.jpg","juniors/596939570_753121177817671_2100943236887556287_n.jpg","juniors/596987871_753121317817657_3618849797323458526_n.jpg","juniors/filles.jpg","juniors/garcons.jpg","juniors/junior.jpg","juniors/medaillesfilles.jpg","juniors/medaillesfilles2.jpg","logo.png","logo.svg","pubcamp.png","robots.txt","seniorsf/476317991_512950888501369_6623827428676986938_n.jpg","seniorsf/476409893_512941455168979_1580933565861198876_n.jpg","seniorsf/477496481_516521098144348_3485000259930080501_n.jpg","seniorsf/497579432_588265970969860_9001455688401227599_n.jpg","seniorsf/498125221_588266074303183_5612941475412953415_n.jpg","seniorsf/498173317_588267090969748_6479066318786700907_n.jpg","seniorsf/504857372_607142349082222_9098258469283938284_n.jpg","seniorsf/537666480_666965629766560_5479786871386011023_n.jpg","seniorsf/548748092_685055974624192_8235511687039625110_n.jpg","seniorsf/556307300_697112810085175_1975719092300683859_n.jpg","seniorsf/557685812_701955899600866_1783289174451825882_n.jpg","seniorsf/558094662_697112446751878_1854653812241426562_n.jpg","seniorsf/558441183_697112236751899_4658294091466256698_n.jpg","seniorsf/561102658_709701402159649_1053392351238307688_n.jpg","seniorsf/bowling.jpg","seniorsf/equipesf.jpg","seniorsf/ladie.png","seniorsf/ladiees.jpg","seniorsf/ladies.png","seniorsh/484728044_540065229123268_5841545901895616995_n.jpg","seniorsh/484871365_540062845790173_8716638303784189487_n.jpg","seniorsh/485031390_540063609123430_1568583722194969349_n.jpg","seniorsh/546491285_684424654687324_2439599584877545049_n.jpg","seniorsh/548234769_684424838020639_4951360372059070411_n.jpg","seniorsh/552250913_691587517304371_2630196048960264861_n.jpg","seniorsh/558093718_701516479644808_398626337699894634_n.jpg","seniorsh/565128694_714236095039513_6422780072515106397_n.jpg","seniorsh/565216392_714234831706306_5347140295007036925_n.jpg","seniorsh/565694409_714234655039657_3240198854373276417_n.jpg","seniorsh/597912014_753510104445445_3695486039007555826_n.jpg","seniorsh/blues.png","slides/trener.jpg","slides/trener1.jpg","slides/trener10.jpg","slides/trener11.jpg","slides/trener14.jpg","slides/trener15.jpg","slides/trener2.jpg","slides/trener3.jpg","slides/trener5.jpg","slides/trener6.jpg","slides/trener8.jpg","slides/trener9.jpg","sponsors/endodesign.png","sponsors/ex.svg","sponsors/exco.png","sponsors/logo-exco.jpg","sponsors/petit-black.svg","sponsors/petit-paris.png","sponsors/uz.svg","team/amandine.jpg","team/antoine.png","team/coman.jpg","team/diani.png","team/doue/10.JPG","team/doue/12.JPG","team/doue/13.JPG","team/doue/19.JPG","team/doue/28.JPG","team/doue/30.JPG","team/doue/54.JPG","team/doue.jpg","team/eugenie.jpg","team/giroud.png","team/wendie.jpg","trener/dominika-trener.jpg","trener/jakub-trener.jpg","trener/patrikk-trener.jpg","trener/patrikw-trener.jpg","trener/pawel-trener.jpg","trener/stephane-trener.jpg","victory.jpg","vitrine/Bidon.jpg","vitrine/Maillot2.jpg","vitrine/Maillot4.jpg","vitrine/ShortBlanc3.png","vitrine/ShortBleu4.jpg","vitrine/Veste1.jpg","vitrine/chaussettes2.png","vitrine/maillot.jpg","vitrine/maillots.jpg","vitrine/roller.png","vitrine/sweatfilles.jpg","vitrine/sweatpluie.jpg","vitrine/vestehv.jpg"]),
	mimeTypes: {".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".jpeg":"image/jpeg",".txt":"text/plain",".JPG":"image/jpeg"},
	_: {
		client: {start:"_app/immutable/entry/start.C7rXTru_.js",app:"_app/immutable/entry/app.DgySO8Ee.js",imports:["_app/immutable/entry/start.C7rXTru_.js","_app/immutable/chunks/DTBIcVS5.js","_app/immutable/chunks/G35wOt7m.js","_app/immutable/chunks/BPhhjFAv.js","_app/immutable/entry/app.DgySO8Ee.js","_app/immutable/chunks/PPVm8Dsz.js","_app/immutable/chunks/G35wOt7m.js","_app/immutable/chunks/D3YV3_XT.js","_app/immutable/chunks/DQOotIaD.js","_app/immutable/chunks/BPhhjFAv.js","_app/immutable/chunks/Cm715Ro6.js","_app/immutable/chunks/DyLC8_-p.js","_app/immutable/chunks/C0YbRnBB.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js')),
			__memo(() => import('./nodes/3.js')),
			__memo(() => import('./nodes/4.js')),
			__memo(() => import('./nodes/5.js')),
			__memo(() => import('./nodes/6.js')),
			__memo(() => import('./nodes/7.js')),
			__memo(() => import('./nodes/8.js')),
			__memo(() => import('./nodes/9.js')),
			__memo(() => import('./nodes/10.js')),
			__memo(() => import('./nodes/11.js')),
			__memo(() => import('./nodes/12.js')),
			__memo(() => import('./nodes/13.js')),
			__memo(() => import('./nodes/14.js')),
			__memo(() => import('./nodes/15.js')),
			__memo(() => import('./nodes/16.js')),
			__memo(() => import('./nodes/17.js')),
			__memo(() => import('./nodes/18.js')),
			__memo(() => import('./nodes/19.js')),
			__memo(() => import('./nodes/20.js')),
			__memo(() => import('./nodes/21.js')),
			__memo(() => import('./nodes/22.js')),
			__memo(() => import('./nodes/23.js')),
			__memo(() => import('./nodes/24.js')),
			__memo(() => import('./nodes/25.js')),
			__memo(() => import('./nodes/26.js')),
			__memo(() => import('./nodes/27.js')),
			__memo(() => import('./nodes/28.js')),
			__memo(() => import('./nodes/29.js')),
			__memo(() => import('./nodes/30.js')),
			__memo(() => import('./nodes/31.js')),
			__memo(() => import('./nodes/32.js')),
			__memo(() => import('./nodes/33.js')),
			__memo(() => import('./nodes/34.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/sponsors/create",
				pattern: /^\/admin\/sponsors\/create\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/sponsors/[id]/edit",
				pattern: /^\/admin\/sponsors\/([^/]+?)\/edit\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/api/[...path]",
				pattern: /^\/api(?:\/([^]*))?\/?$/,
				params: [{"name":"path","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/_...path_/_server.js'))
			},
			{
				id: "/camps",
				pattern: /^\/camps\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/club",
				pattern: /^\/club\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/club/about",
				pattern: /^\/club\/about\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/club/coaches",
				pattern: /^\/club\/coaches\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/club/coaches/dominika-klosowska",
				pattern: /^\/club\/coaches\/dominika-klosowska\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/club/coaches/jakub-golanski",
				pattern: /^\/club\/coaches\/jakub-golanski\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/club/coaches/patryk-kamionka",
				pattern: /^\/club\/coaches\/patryk-kamionka\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/club/coaches/patryk-wesolowski",
				pattern: /^\/club\/coaches\/patryk-wesolowski\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/club/coaches/pawel-kulesa",
				pattern: /^\/club\/coaches\/pawel-kulesa\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/club/coaches/stephane-wutezi",
				pattern: /^\/club\/coaches\/stephane-wutezi\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/club/partners",
				pattern: /^\/club\/partners\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/contact",
				pattern: /^\/contact\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/register",
				pattern: /^\/register\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/shop",
				pattern: /^\/shop\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/teams",
				pattern: /^\/teams\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/teams/academy",
				pattern: /^\/teams\/academy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/teams/blues",
				pattern: /^\/teams\/blues\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/teams/coman",
				pattern: /^\/teams\/coman\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			},
			{
				id: "/teams/diani",
				pattern: /^\/teams\/diani\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 27 },
				endpoint: null
			},
			{
				id: "/teams/doue",
				pattern: /^\/teams\/doue\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 28 },
				endpoint: null
			},
			{
				id: "/teams/giroud",
				pattern: /^\/teams\/giroud\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 29 },
				endpoint: null
			},
			{
				id: "/teams/griezmann",
				pattern: /^\/teams\/griezmann\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 30 },
				endpoint: null
			},
			{
				id: "/teams/henry",
				pattern: /^\/teams\/henry\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 31 },
				endpoint: null
			},
			{
				id: "/teams/ladies",
				pattern: /^\/teams\/ladies\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 32 },
				endpoint: null
			},
			{
				id: "/teams/lesommer",
				pattern: /^\/teams\/lesommer\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 33 },
				endpoint: null
			},
			{
				id: "/teams/renard",
				pattern: /^\/teams\/renard\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 34 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
