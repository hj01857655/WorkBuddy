import { n as __esmMin } from "./rolldown-runtime-V4kyJ4NV.js";
//#region ../../node_modules/.pnpm/@tencent+smart-doc-editor@2_0025703c4e2e31b4b19a06065094f011/node_modules/@tencent/smart-doc-editor/dist/view/components/emoji/picker/emoji-data.mjs
function e(e) {
	return e.split(`_`).map((e) => e && e[0].toUpperCase() + e.slice(1)).join(` `);
}
function t(t, n) {
	return t.startsWith(`custom:`) ? n : e(n);
}
var n, r;
var init_emoji_data = __esmMin((() => {
	n = [
		{
			id: `people`,
			key: `people`,
			icon: `😊`,
			items: [
				{
					emoji: `😀`,
					name: `grinning_face`,
					keywords: [
						`happy`,
						`smile`,
						`joy`,
						`cheerful`
					]
				},
				{
					emoji: `😃`,
					name: `grinning_face_with_big_eyes`,
					keywords: [
						`happy`,
						`smile`,
						`excited`,
						`joy`
					]
				},
				{
					emoji: `😄`,
					name: `grinning_face_with_smiling_eyes`,
					keywords: [
						`happy`,
						`smile`,
						`cheerful`,
						`pleased`
					]
				},
				{
					emoji: `😁`,
					name: `beaming_face_with_smiling_eyes`,
					keywords: [
						`happy`,
						`grin`,
						`cheerful`,
						`proud`
					]
				},
				{
					emoji: `😆`,
					name: `grinning_squinting_face`,
					keywords: [
						`happy`,
						`laugh`,
						`haha`,
						`hilarious`
					]
				},
				{
					emoji: `😅`,
					name: `grinning_face_with_sweat`,
					keywords: [
						`nervous`,
						`awkward`,
						`relief`,
						`phew`
					]
				},
				{
					emoji: `🤣`,
					name: `rolling_on_the_floor_laughing`,
					keywords: [
						`lol`,
						`rofl`,
						`haha`,
						`hilarious`,
						`funny`
					]
				},
				{
					emoji: `😂`,
					name: `face_with_tears_of_joy`,
					keywords: [
						`lol`,
						`laugh`,
						`haha`,
						`funny`,
						`crying`
					]
				},
				{
					emoji: `🙂`,
					name: `slightly_smiling_face`,
					keywords: [
						`happy`,
						`okay`,
						`polite`,
						`fine`
					]
				},
				{
					emoji: `🙃`,
					name: `upside_down_face`,
					keywords: [
						`sarcasm`,
						`silly`,
						`irony`,
						`joke`
					]
				},
				{
					emoji: `🫠`,
					name: `melting_face`,
					keywords: [
						`hot`,
						`embarrassed`,
						`disappear`,
						`melt`
					]
				},
				{
					emoji: `😉`,
					name: `winking_face`,
					keywords: [
						`flirt`,
						`hint`,
						`playful`,
						`joke`
					]
				},
				{
					emoji: `😊`,
					name: `smiling_face_with_smiling_eyes`,
					keywords: [
						`happy`,
						`blush`,
						`warm`,
						`kind`
					]
				},
				{
					emoji: `😇`,
					name: `smiling_face_with_halo`,
					keywords: [
						`angel`,
						`innocent`,
						`good`,
						`pure`
					]
				},
				{
					emoji: `🥰`,
					name: `smiling_face_with_hearts`,
					keywords: [
						`love`,
						`adore`,
						`crush`,
						`infatuated`
					]
				},
				{
					emoji: `😍`,
					name: `smiling_face_with_heart_eyes`,
					keywords: [
						`love`,
						`crush`,
						`beautiful`,
						`amazing`
					]
				},
				{
					emoji: `🤩`,
					name: `star_struck`,
					keywords: [
						`amazing`,
						`wow`,
						`celebrity`,
						`admire`,
						`excited`
					]
				},
				{
					emoji: `😘`,
					name: `face_blowing_a_kiss`,
					keywords: [
						`love`,
						`flirt`,
						`bye`,
						`mwah`
					]
				},
				{
					emoji: `😗`,
					name: `kissing_face`,
					keywords: [
						`love`,
						`smooch`,
						`whistle`,
						`pucker`
					]
				},
				{
					emoji: `☺️`,
					name: `smiling_face`,
					keywords: [
						`happy`,
						`warm`,
						`kind`,
						`content`
					]
				},
				{
					emoji: `😚`,
					name: `kissing_face_with_closed_eyes`,
					keywords: [
						`love`,
						`smooch`,
						`tender`,
						`sweet`
					]
				},
				{
					emoji: `😙`,
					name: `kissing_face_with_smiling_eyes`,
					keywords: [
						`love`,
						`happy`,
						`sweet`,
						`affection`
					]
				},
				{
					emoji: `🥲`,
					name: `smiling_face_with_tear`,
					keywords: [
						`grateful`,
						`touched`,
						`bittersweet`,
						`moved`
					]
				},
				{
					emoji: `😋`,
					name: `face_savoring_food`,
					keywords: [
						`yummy`,
						`delicious`,
						`tasty`,
						`hungry`
					]
				},
				{
					emoji: `😛`,
					name: `face_with_tongue`,
					keywords: [
						`playful`,
						`silly`,
						`tease`,
						`joke`
					]
				},
				{
					emoji: `😜`,
					name: `winking_face_with_tongue`,
					keywords: [
						`playful`,
						`silly`,
						`crazy`,
						`tease`
					]
				},
				{
					emoji: `🤪`,
					name: `zany_face`,
					keywords: [
						`crazy`,
						`wild`,
						`goofy`,
						`silly`,
						`fun`
					]
				},
				{
					emoji: `😝`,
					name: `squinting_face_with_tongue`,
					keywords: [
						`playful`,
						`silly`,
						`tease`,
						`taste`
					]
				},
				{
					emoji: `🤑`,
					name: `money_mouth_face`,
					keywords: [
						`rich`,
						`dollar`,
						`cash`,
						`wealthy`,
						`greedy`
					]
				},
				{
					emoji: `🤗`,
					name: `smiling_face_with_open_hands`,
					keywords: [
						`hug`,
						`warm`,
						`welcome`,
						`embrace`
					]
				},
				{
					emoji: `🤭`,
					name: `face_with_hand_over_mouth`,
					keywords: [
						`oops`,
						`giggle`,
						`secret`,
						`shy`
					]
				},
				{
					emoji: `🫢`,
					name: `face_with_open_eyes_and_hand_over_mouth`,
					keywords: [
						`shock`,
						`surprise`,
						`oops`,
						`gasp`
					]
				},
				{
					emoji: `🫣`,
					name: `face_with_peeking_eye`,
					keywords: [
						`shy`,
						`curious`,
						`peek`,
						`nervous`
					]
				},
				{
					emoji: `🤫`,
					name: `shushing_face`,
					keywords: [
						`quiet`,
						`secret`,
						`hush`,
						`silence`
					]
				},
				{
					emoji: `🤔`,
					name: `thinking_face`,
					keywords: [
						`wonder`,
						`consider`,
						`ponder`,
						`hmm`
					]
				},
				{
					emoji: `🫡`,
					name: `saluting_face`,
					keywords: [
						`respect`,
						`honor`,
						`yes_sir`,
						`military`
					]
				},
				{
					emoji: `🤐`,
					name: `zipper_mouth_face`,
					keywords: [
						`secret`,
						`quiet`,
						`sealed`,
						`mute`
					]
				},
				{
					emoji: `🤨`,
					name: `face_with_raised_eyebrow`,
					keywords: [
						`doubt`,
						`skeptical`,
						`suspicious`,
						`really`
					]
				},
				{
					emoji: `😐`,
					name: `neutral_face`,
					keywords: [
						`blank`,
						`indifferent`,
						`meh`,
						`deadpan`
					]
				},
				{
					emoji: `😑`,
					name: `expressionless_face`,
					keywords: [
						`blank`,
						`unimpressed`,
						`meh`,
						`bored`
					]
				},
				{
					emoji: `😶`,
					name: `face_without_mouth`,
					keywords: [
						`speechless`,
						`silent`,
						`mute`,
						`quiet`
					]
				},
				{
					emoji: `🫥`,
					name: `dotted_line_face`,
					keywords: [
						`invisible`,
						`hidden`,
						`shy`,
						`introvert`
					]
				},
				{
					emoji: `😶‍🌫️`,
					name: `face_in_clouds`,
					keywords: [
						`dreamy`,
						`foggy`,
						`absent`,
						`confused`
					]
				},
				{
					emoji: `😏`,
					name: `smirking_face`,
					keywords: [
						`smug`,
						`flirt`,
						`sly`,
						`suggestive`
					]
				},
				{
					emoji: `😒`,
					name: `unamused_face`,
					keywords: [
						`bored`,
						`annoyed`,
						`meh`,
						`disappointed`
					]
				},
				{
					emoji: `🙄`,
					name: `face_with_rolling_eyes`,
					keywords: [
						`whatever`,
						`sarcasm`,
						`annoyed`,
						`bored`
					]
				},
				{
					emoji: `😬`,
					name: `grimacing_face`,
					keywords: [
						`awkward`,
						`nervous`,
						`cringe`,
						`oops`
					]
				},
				{
					emoji: `😮‍💨`,
					name: `face_exhaling`,
					keywords: [
						`sigh`,
						`relief`,
						`tired`,
						`disappointed`
					]
				},
				{
					emoji: `🤥`,
					name: `lying_face`,
					keywords: [
						`liar`,
						`pinocchio`,
						`dishonest`,
						`fib`
					]
				},
				{
					emoji: `😌`,
					name: `relieved_face`,
					keywords: [
						`peaceful`,
						`calm`,
						`content`,
						`relaxed`
					]
				},
				{
					emoji: `😔`,
					name: `pensive_face`,
					keywords: [
						`sad`,
						`thoughtful`,
						`reflective`,
						`melancholy`
					]
				},
				{
					emoji: `😪`,
					name: `sleepy_face`,
					keywords: [
						`tired`,
						`drowsy`,
						`yawn`,
						`exhausted`
					]
				},
				{
					emoji: `🤤`,
					name: `drooling_face`,
					keywords: [
						`hungry`,
						`desire`,
						`yummy`,
						`want`
					]
				},
				{
					emoji: `😴`,
					name: `sleeping_face`,
					keywords: [
						`zzz`,
						`nap`,
						`rest`,
						`snore`,
						`dream`
					]
				},
				{
					emoji: `😷`,
					name: `face_with_medical_mask`,
					keywords: [
						`sick`,
						`covid`,
						`flu`,
						`protect`
					]
				},
				{
					emoji: `🤒`,
					name: `face_with_thermometer`,
					keywords: [
						`fever`,
						`sick`,
						`ill`,
						`temperature`
					]
				},
				{
					emoji: `🤕`,
					name: `face_with_head_bandage`,
					keywords: [
						`hurt`,
						`injured`,
						`pain`,
						`accident`
					]
				},
				{
					emoji: `🤢`,
					name: `nauseated_face`,
					keywords: [
						`sick`,
						`gross`,
						`disgusting`,
						`nausea`
					]
				},
				{
					emoji: `🤮`,
					name: `face_vomiting`,
					keywords: [
						`puke`,
						`sick`,
						`gross`,
						`disgusting`
					]
				},
				{
					emoji: `🤧`,
					name: `sneezing_face`,
					keywords: [
						`cold`,
						`flu`,
						`allergy`,
						`achoo`
					]
				},
				{
					emoji: `🥵`,
					name: `hot_face`,
					keywords: [
						`hot`,
						`sweating`,
						`heat`,
						`summer`
					]
				},
				{
					emoji: `🥶`,
					name: `cold_face`,
					keywords: [
						`cold`,
						`frozen`,
						`winter`,
						`ice`,
						`shiver`
					]
				},
				{
					emoji: `🥴`,
					name: `woozy_face`,
					keywords: [
						`drunk`,
						`dizzy`,
						`tipsy`,
						`confused`
					]
				},
				{
					emoji: `😵`,
					name: `face_with_crossed_out_eyes`,
					keywords: [
						`dead`,
						`shocked`,
						`ko`,
						`overwhelmed`
					]
				},
				{
					emoji: `😵‍💫`,
					name: `face_with_spiral_eyes`,
					keywords: [
						`dizzy`,
						`hypnotized`,
						`confused`,
						`crazy`
					]
				},
				{
					emoji: `🤯`,
					name: `exploding_head`,
					keywords: [
						`mind_blown`,
						`shocked`,
						`wow`,
						`amazing`
					]
				},
				{
					emoji: `🤠`,
					name: `cowboy_hat_face`,
					keywords: [
						`western`,
						`country`,
						`yeehaw`,
						`cool`
					]
				},
				{
					emoji: `🥳`,
					name: `partying_face`,
					keywords: [
						`celebrate`,
						`birthday`,
						`party`,
						`hooray`
					]
				},
				{
					emoji: `🥸`,
					name: `disguised_face`,
					keywords: [
						`incognito`,
						`spy`,
						`hidden`,
						`fake`
					]
				},
				{
					emoji: `😎`,
					name: `smiling_face_with_sunglasses`,
					keywords: [
						`cool`,
						`confident`,
						`boss`,
						`chill`
					]
				},
				{
					emoji: `🤓`,
					name: `nerd_face`,
					keywords: [
						`geek`,
						`smart`,
						`study`,
						`glasses`
					]
				},
				{
					emoji: `🧐`,
					name: `face_with_monocle`,
					keywords: [
						`curious`,
						`inspect`,
						`classy`,
						`examine`
					]
				},
				{
					emoji: `😕`,
					name: `confused_face`,
					keywords: [
						`puzzled`,
						`unsure`,
						`lost`,
						`what`
					]
				},
				{
					emoji: `🫤`,
					name: `face_with_diagonal_mouth`,
					keywords: [
						`unsure`,
						`skeptical`,
						`meh`,
						`idk`
					]
				},
				{
					emoji: `😟`,
					name: `worried_face`,
					keywords: [
						`anxious`,
						`concerned`,
						`nervous`,
						`stressed`
					]
				},
				{
					emoji: `🙁`,
					name: `slightly_frowning_face`,
					keywords: [
						`sad`,
						`unhappy`,
						`disappointed`,
						`down`
					]
				},
				{
					emoji: `☹️`,
					name: `frowning_face`,
					keywords: [
						`sad`,
						`unhappy`,
						`upset`,
						`depressed`
					]
				},
				{
					emoji: `😮`,
					name: `face_with_open_mouth`,
					keywords: [
						`surprise`,
						`shock`,
						`wow`,
						`gasp`
					]
				},
				{
					emoji: `😯`,
					name: `hushed_face`,
					keywords: [
						`surprise`,
						`shock`,
						`stunned`,
						`quiet`
					]
				},
				{
					emoji: `😲`,
					name: `astonished_face`,
					keywords: [
						`amazed`,
						`shock`,
						`wow`,
						`incredible`
					]
				},
				{
					emoji: `😳`,
					name: `flushed_face`,
					keywords: [
						`embarrassed`,
						`shy`,
						`blush`,
						`awkward`
					]
				},
				{
					emoji: `🥺`,
					name: `pleading_face`,
					keywords: [
						`puppy_eyes`,
						`cute`,
						`please`,
						`beg`
					]
				},
				{
					emoji: `🥹`,
					name: `face_holding_back_tears`,
					keywords: [
						`sad`,
						`emotional`,
						`touched`,
						`moved`
					]
				},
				{
					emoji: `😦`,
					name: `frowning_face_with_open_mouth`,
					keywords: [
						`shock`,
						`dismay`,
						`horror`,
						`sad`
					]
				},
				{
					emoji: `😧`,
					name: `anguished_face`,
					keywords: [
						`pain`,
						`distress`,
						`suffering`,
						`agony`
					]
				},
				{
					emoji: `😨`,
					name: `fearful_face`,
					keywords: [
						`scared`,
						`afraid`,
						`terrified`,
						`horror`
					]
				},
				{
					emoji: `😰`,
					name: `anxious_face_with_sweat`,
					keywords: [
						`nervous`,
						`worried`,
						`stressed`,
						`panic`
					]
				},
				{
					emoji: `😥`,
					name: `sad_but_relieved_face`,
					keywords: [
						`sorry`,
						`worried`,
						`phew`,
						`down`
					]
				},
				{
					emoji: `😢`,
					name: `crying_face`,
					keywords: [
						`sad`,
						`tears`,
						`unhappy`,
						`sob`
					]
				},
				{
					emoji: `😭`,
					name: `loudly_crying_face`,
					keywords: [
						`sob`,
						`wail`,
						`devastated`,
						`bawling`
					]
				},
				{
					emoji: `😱`,
					name: `face_screaming_in_fear`,
					keywords: [
						`horror`,
						`scared`,
						`scream`,
						`shock`
					]
				},
				{
					emoji: `😖`,
					name: `confounded_face`,
					keywords: [
						`frustrated`,
						`upset`,
						`cringe`,
						`troubled`
					]
				},
				{
					emoji: `😣`,
					name: `persevering_face`,
					keywords: [
						`struggle`,
						`endure`,
						`frustrated`,
						`tough`
					]
				},
				{
					emoji: `😞`,
					name: `disappointed_face`,
					keywords: [
						`sad`,
						`let_down`,
						`bummed`,
						`unhappy`
					]
				},
				{
					emoji: `😓`,
					name: `downcast_face_with_sweat`,
					keywords: [
						`sorry`,
						`hard_work`,
						`tired`,
						`effort`
					]
				},
				{
					emoji: `😩`,
					name: `weary_face`,
					keywords: [
						`exhausted`,
						`fed_up`,
						`stressed`,
						`done`
					]
				},
				{
					emoji: `😫`,
					name: `tired_face`,
					keywords: [
						`exhausted`,
						`fatigued`,
						`drained`,
						`sleepy`
					]
				},
				{
					emoji: `🥱`,
					name: `yawning_face`,
					keywords: [
						`bored`,
						`sleepy`,
						`boring`,
						`tired`
					]
				},
				{
					emoji: `😤`,
					name: `face_with_steam_from_nose`,
					keywords: [
						`triumph`,
						`proud`,
						`huffing`,
						`angry`
					]
				},
				{
					emoji: `😡`,
					name: `enraged_face`,
					keywords: [
						`furious`,
						`angry`,
						`mad`,
						`rage`,
						`hate`
					]
				},
				{
					emoji: `😠`,
					name: `angry_face`,
					keywords: [
						`mad`,
						`annoyed`,
						`furious`,
						`upset`
					]
				},
				{
					emoji: `🤬`,
					name: `face_with_symbols_on_mouth`,
					keywords: [
						`cursing`,
						`swearing`,
						`profanity`,
						`angry`
					]
				},
				{
					emoji: `😈`,
					name: `smiling_face_with_horns`,
					keywords: [
						`devil`,
						`naughty`,
						`mischief`,
						`evil`
					]
				},
				{
					emoji: `👿`,
					name: `angry_face_with_horns`,
					keywords: [
						`devil`,
						`evil`,
						`demon`,
						`wicked`
					]
				},
				{
					emoji: `💀`,
					name: `skull`,
					keywords: [
						`dead`,
						`death`,
						`hilarious`,
						`rip`
					]
				},
				{
					emoji: `☠️`,
					name: `skull_and_crossbones`,
					keywords: [
						`danger`,
						`poison`,
						`pirate`,
						`toxic`
					]
				},
				{
					emoji: `💩`,
					name: `pile_of_poo`,
					keywords: [
						`crap`,
						`poop`,
						`funny`,
						`shit`
					]
				},
				{
					emoji: `🤡`,
					name: `clown_face`,
					keywords: [
						`joker`,
						`circus`,
						`funny`,
						`fool`
					]
				},
				{
					emoji: `👹`,
					name: `ogre`,
					keywords: [
						`monster`,
						`scary`,
						`japanese`,
						`demon`
					]
				},
				{
					emoji: `👺`,
					name: `goblin`,
					keywords: [
						`monster`,
						`scary`,
						`tengu`,
						`japanese`
					]
				},
				{
					emoji: `👻`,
					name: `ghost`,
					keywords: [
						`halloween`,
						`spooky`,
						`boo`,
						`spirit`
					]
				},
				{
					emoji: `👽`,
					name: `alien`,
					keywords: [
						`ufo`,
						`space`,
						`extraterrestrial`,
						`mars`
					]
				},
				{
					emoji: `👾`,
					name: `alien_monster`,
					keywords: [
						`game`,
						`arcade`,
						`space_invader`,
						`pixel`
					]
				},
				{
					emoji: `🤖`,
					name: `robot`,
					keywords: [
						`machine`,
						`ai`,
						`bot`,
						`android`
					]
				},
				{
					emoji: `😺`,
					name: `grinning_cat`,
					keywords: [
						`cat`,
						`happy`,
						`meow`,
						`smile`
					]
				},
				{
					emoji: `😸`,
					name: `grinning_cat_with_smiling_eyes`,
					keywords: [
						`cat`,
						`happy`,
						`meow`,
						`pleased`
					]
				},
				{
					emoji: `😹`,
					name: `cat_with_tears_of_joy`,
					keywords: [
						`cat`,
						`laugh`,
						`funny`,
						`lol`
					]
				},
				{
					emoji: `😻`,
					name: `smiling_cat_with_heart_eyes`,
					keywords: [
						`cat`,
						`love`,
						`adore`,
						`crush`
					]
				},
				{
					emoji: `😼`,
					name: `cat_with_wry_smile`,
					keywords: [
						`cat`,
						`smirk`,
						`sarcasm`,
						`irony`
					]
				},
				{
					emoji: `😽`,
					name: `kissing_cat`,
					keywords: [
						`cat`,
						`love`,
						`smooch`,
						`meow`
					]
				},
				{
					emoji: `🙀`,
					name: `weary_cat`,
					keywords: [
						`cat`,
						`shocked`,
						`omg`,
						`surprised`
					]
				},
				{
					emoji: `😿`,
					name: `crying_cat`,
					keywords: [
						`cat`,
						`sad`,
						`tears`,
						`unhappy`
					]
				},
				{
					emoji: `😾`,
					name: `pouting_cat`,
					keywords: [
						`cat`,
						`angry`,
						`grumpy`,
						`annoyed`
					]
				},
				{
					emoji: `🙈`,
					name: `see_no_evil_monkey`,
					keywords: [
						`monkey`,
						`shy`,
						`hide`,
						`oops`
					]
				},
				{
					emoji: `🙉`,
					name: `hear_no_evil_monkey`,
					keywords: [
						`monkey`,
						`ignore`,
						`deaf`,
						`noise`
					]
				},
				{
					emoji: `🙊`,
					name: `speak_no_evil_monkey`,
					keywords: [
						`monkey`,
						`secret`,
						`quiet`,
						`mute`
					]
				},
				{
					emoji: `💌`,
					name: `love_letter`,
					keywords: [
						`mail`,
						`valentine`,
						`romance`,
						`envelope`
					]
				},
				{
					emoji: `💘`,
					name: `heart_with_arrow`,
					keywords: [
						`cupid`,
						`valentine`,
						`romance`,
						`crush`
					]
				},
				{
					emoji: `💝`,
					name: `heart_with_ribbon`,
					keywords: [
						`gift`,
						`present`,
						`valentine`,
						`love`
					]
				},
				{
					emoji: `💖`,
					name: `sparkling_heart`,
					keywords: [
						`sparkle`,
						`glitter`,
						`shine`,
						`pretty`
					]
				},
				{
					emoji: `💗`,
					name: `growing_heart`,
					keywords: [
						`excited`,
						`bigger`,
						`affection`,
						`love`
					]
				},
				{
					emoji: `💓`,
					name: `beating_heart`,
					keywords: [
						`pulse`,
						`heartbeat`,
						`alive`,
						`excited`
					]
				},
				{
					emoji: `💞`,
					name: `revolving_hearts`,
					keywords: [
						`love`,
						`romance`,
						`couple`,
						`affection`
					]
				},
				{
					emoji: `💕`,
					name: `two_hearts`,
					keywords: [
						`love`,
						`couple`,
						`romance`,
						`together`
					]
				},
				{
					emoji: `💟`,
					name: `heart_decoration`,
					keywords: [
						`cute`,
						`ornament`,
						`pretty`,
						`love`
					]
				},
				{
					emoji: `❣️`,
					name: `heart_exclamation`,
					keywords: [
						`love`,
						`passion`,
						`emphasis`,
						`strong`
					]
				},
				{
					emoji: `💔`,
					name: `broken_heart`,
					keywords: [
						`sad`,
						`breakup`,
						`heartbreak`,
						`loss`
					]
				},
				{
					emoji: `❤️‍🔥`,
					name: `heart_on_fire`,
					keywords: [
						`passion`,
						`desire`,
						`intense`,
						`burning`
					]
				},
				{
					emoji: `❤️‍🩹`,
					name: `mending_heart`,
					keywords: [
						`heal`,
						`recover`,
						`hope`,
						`fix`
					]
				},
				{
					emoji: `❤️`,
					name: `red_heart`,
					keywords: [
						`love`,
						`passion`,
						`romance`,
						`like`
					]
				},
				{
					emoji: `🧡`,
					name: `orange_heart`,
					keywords: [
						`warm`,
						`friendship`,
						`care`,
						`autumn`
					]
				},
				{
					emoji: `💛`,
					name: `yellow_heart`,
					keywords: [
						`friendship`,
						`happiness`,
						`sunshine`,
						`gold`
					]
				},
				{
					emoji: `💚`,
					name: `green_heart`,
					keywords: [
						`nature`,
						`health`,
						`envy`,
						`eco`
					]
				},
				{
					emoji: `💙`,
					name: `blue_heart`,
					keywords: [
						`trust`,
						`loyalty`,
						`calm`,
						`ocean`
					]
				},
				{
					emoji: `💜`,
					name: `purple_heart`,
					keywords: [
						`royalty`,
						`luxury`,
						`honor`,
						`compassion`
					]
				},
				{
					emoji: `🤎`,
					name: `brown_heart`,
					keywords: [
						`earth`,
						`nature`,
						`chocolate`,
						`warm`
					]
				},
				{
					emoji: `🖤`,
					name: `black_heart`,
					keywords: [
						`dark`,
						`evil`,
						`goth`,
						`grief`
					]
				},
				{
					emoji: `🤍`,
					name: `white_heart`,
					keywords: [
						`pure`,
						`clean`,
						`peace`,
						`minimalist`
					]
				},
				{
					emoji: `💋`,
					name: `kiss_mark`,
					keywords: [
						`lips`,
						`love`,
						`smooch`,
						`lipstick`
					]
				},
				{
					emoji: `💯`,
					name: `hundred_points`,
					keywords: [
						`perfect`,
						`score`,
						`100`,
						`exam`
					]
				},
				{
					emoji: `💢`,
					name: `anger_symbol`,
					keywords: [
						`angry`,
						`mad`,
						`vein`,
						`furious`
					]
				},
				{
					emoji: `💥`,
					name: `collision`,
					keywords: [
						`boom`,
						`crash`,
						`pow`,
						`bang`,
						`impact`
					]
				},
				{
					emoji: `💫`,
					name: `dizzy`,
					keywords: [
						`star`,
						`sparkle`,
						`lightheaded`,
						`spin`
					]
				},
				{
					emoji: `💦`,
					name: `sweat_droplets`,
					keywords: [
						`water`,
						`splash`,
						`wet`,
						`effort`
					]
				},
				{
					emoji: `💨`,
					name: `dashing_away`,
					keywords: [
						`fast`,
						`wind`,
						`speed`,
						`running`
					]
				},
				{
					emoji: `🕳`,
					name: `hole`,
					keywords: [
						`void`,
						`pit`,
						`empty`,
						`dark`
					]
				},
				{
					emoji: `💬`,
					name: `speech_balloon`,
					keywords: [
						`chat`,
						`talk`,
						`message`,
						`comment`
					]
				},
				{
					emoji: `👁️‍🗨️`,
					name: `eye_in_speech_bubble`,
					keywords: [
						`witness`,
						`watch`,
						`privacy`,
						`surveillance`
					]
				},
				{
					emoji: `🗨`,
					name: `left_speech_bubble`,
					keywords: [
						`chat`,
						`talk`,
						`message`,
						`reply`
					]
				},
				{
					emoji: `🗯`,
					name: `right_anger_bubble`,
					keywords: [
						`yell`,
						`shout`,
						`argue`,
						`angry`
					]
				},
				{
					emoji: `💭`,
					name: `thought_balloon`,
					keywords: [
						`think`,
						`idea`,
						`dream`,
						`wonder`
					]
				},
				{
					emoji: `💤`,
					name: `zzz`,
					keywords: [
						`sleep`,
						`snore`,
						`tired`,
						`nap`,
						`bored`
					]
				},
				{
					emoji: `👋`,
					name: `waving_hand`,
					keywords: [
						`hello`,
						`hi`,
						`bye`,
						`greeting`
					]
				},
				{
					emoji: `🤚`,
					name: `raised_back_of_hand`,
					keywords: [
						`stop`,
						`halt`,
						`backhand`,
						`greeting`
					]
				},
				{
					emoji: `🖐`,
					name: `hand_with_fingers_splayed`,
					keywords: [
						`high_five`,
						`stop`,
						`five`,
						`wave`
					]
				},
				{
					emoji: `✋`,
					name: `raised_hand`,
					keywords: [
						`high_five`,
						`stop`,
						`volunteer`,
						`halt`
					]
				},
				{
					emoji: `🖖`,
					name: `vulcan_salute`,
					keywords: [
						`spock`,
						`star_trek`,
						`prosper`,
						`greeting`
					]
				},
				{
					emoji: `🫱`,
					name: `rightwards_hand`,
					keywords: [
						`right`,
						`direction`,
						`shake`,
						`offer`
					]
				},
				{
					emoji: `🫲`,
					name: `leftwards_hand`,
					keywords: [
						`left`,
						`direction`,
						`shake`,
						`offer`
					]
				},
				{
					emoji: `🫳`,
					name: `palm_down_hand`,
					keywords: [
						`lower`,
						`calm`,
						`drop`,
						`stop`
					]
				},
				{
					emoji: `🫴`,
					name: `palm_up_hand`,
					keywords: [
						`offer`,
						`ask`,
						`give`,
						`receive`
					]
				},
				{
					emoji: `👌`,
					name: `ok_hand`,
					keywords: [
						`perfect`,
						`okay`,
						`fine`,
						`good`
					]
				},
				{
					emoji: `🤌`,
					name: `pinched_fingers`,
					keywords: [
						`italian`,
						`perfect`,
						`chef_kiss`,
						`what`
					]
				},
				{
					emoji: `🤏`,
					name: `pinching_hand`,
					keywords: [
						`small`,
						`tiny`,
						`little`,
						`bit`
					]
				},
				{
					emoji: `✌️`,
					name: `victory_hand`,
					keywords: [
						`peace`,
						`two`,
						`yeah`,
						`v_sign`
					]
				},
				{
					emoji: `🤞`,
					name: `crossed_fingers`,
					keywords: [
						`luck`,
						`wish`,
						`hope`,
						`pray`
					]
				},
				{
					emoji: `🫰`,
					name: `hand_with_index_finger_and_thumb_crossed`,
					keywords: [
						`money`,
						`snap`,
						`love`,
						`heart`
					]
				},
				{
					emoji: `🤟`,
					name: `love_you_gesture`,
					keywords: [
						`ily`,
						`rock`,
						`sign_language`,
						`love`
					]
				},
				{
					emoji: `🤘`,
					name: `sign_of_the_horns`,
					keywords: [
						`rock`,
						`metal`,
						`devil`,
						`cool`
					]
				},
				{
					emoji: `🤙`,
					name: `call_me_hand`,
					keywords: [
						`phone`,
						`shaka`,
						`hang_loose`,
						`call`
					]
				},
				{
					emoji: `👈`,
					name: `backhand_index_pointing_left`,
					keywords: [
						`left`,
						`direction`,
						`look`,
						`there`
					]
				},
				{
					emoji: `👉`,
					name: `backhand_index_pointing_right`,
					keywords: [
						`right`,
						`direction`,
						`look`,
						`here`
					]
				},
				{
					emoji: `👆`,
					name: `backhand_index_pointing_up`,
					keywords: [
						`up`,
						`above`,
						`important`,
						`look`
					]
				},
				{
					emoji: `🖕`,
					name: `middle_finger`,
					keywords: [
						`rude`,
						`offensive`,
						`flip_off`,
						`angry`
					]
				},
				{
					emoji: `👇`,
					name: `backhand_index_pointing_down`,
					keywords: [
						`down`,
						`below`,
						`here`,
						`look`
					]
				},
				{
					emoji: `☝️`,
					name: `index_pointing_up`,
					keywords: [
						`attention`,
						`important`,
						`one`,
						`first`
					]
				},
				{
					emoji: `🫵`,
					name: `index_pointing_at_the_viewer`,
					keywords: [
						`you`,
						`chosen`,
						`selected`,
						`hey`
					]
				},
				{
					emoji: `👍`,
					name: `thumbs_up`,
					keywords: [
						`like`,
						`good`,
						`approve`,
						`agree`
					]
				},
				{
					emoji: `👎`,
					name: `thumbs_down`,
					keywords: [
						`dislike`,
						`bad`,
						`disagree`,
						`reject`
					]
				},
				{
					emoji: `✊`,
					name: `raised_fist`,
					keywords: [
						`power`,
						`fight`,
						`solidarity`,
						`strong`
					]
				},
				{
					emoji: `👊`,
					name: `oncoming_fist`,
					keywords: [
						`bump`,
						`punch`,
						`fight`,
						`power`
					]
				},
				{
					emoji: `🤛`,
					name: `left_facing_fist`,
					keywords: [
						`fist_bump`,
						`punch`,
						`power`,
						`fight`
					]
				},
				{
					emoji: `🤜`,
					name: `right_facing_fist`,
					keywords: [
						`fist_bump`,
						`punch`,
						`power`,
						`fight`
					]
				},
				{
					emoji: `👏`,
					name: `clapping_hands`,
					keywords: [
						`bravo`,
						`applause`,
						`congrats`,
						`well_done`
					]
				},
				{
					emoji: `🙌`,
					name: `raising_hands`,
					keywords: [
						`celebrate`,
						`hooray`,
						`praise`,
						`yay`
					]
				},
				{
					emoji: `🫶`,
					name: `heart_hands`,
					keywords: [
						`love`,
						`care`,
						`affection`,
						`support`
					]
				},
				{
					emoji: `👐`,
					name: `open_hands`,
					keywords: [
						`hug`,
						`welcome`,
						`embrace`,
						`jazz_hands`
					]
				},
				{
					emoji: `🤲`,
					name: `palms_up_together`,
					keywords: [
						`pray`,
						`offer`,
						`receive`,
						`book`
					]
				},
				{
					emoji: `🤝`,
					name: `handshake`,
					keywords: [
						`deal`,
						`agreement`,
						`cooperation`,
						`hello`
					]
				},
				{
					emoji: `🙏`,
					name: `folded_hands`,
					keywords: [
						`pray`,
						`please`,
						`thanks`,
						`hope`,
						`namaste`
					]
				},
				{
					emoji: `✍️`,
					name: `writing_hand`,
					keywords: [
						`write`,
						`note`,
						`compose`,
						`sign`
					]
				},
				{
					emoji: `💅`,
					name: `nail_polish`,
					keywords: [
						`beauty`,
						`manicure`,
						`fabulous`,
						`sassy`
					]
				},
				{
					emoji: `🤳`,
					name: `selfie`,
					keywords: [
						`camera`,
						`photo`,
						`picture`,
						`mirror`
					]
				},
				{
					emoji: `💪`,
					name: `flexed_biceps`,
					keywords: [
						`strong`,
						`muscle`,
						`workout`,
						`gym`,
						`power`
					]
				},
				{
					emoji: `🦾`,
					name: `mechanical_arm`,
					keywords: [
						`prosthetic`,
						`robot`,
						`cyborg`,
						`bionic`
					]
				},
				{
					emoji: `🦿`,
					name: `mechanical_leg`,
					keywords: [
						`prosthetic`,
						`robot`,
						`cyborg`,
						`bionic`
					]
				},
				{
					emoji: `🦵`,
					name: `leg`,
					keywords: [
						`kick`,
						`limb`,
						`walk`,
						`run`
					]
				},
				{
					emoji: `🦶`,
					name: `foot`,
					keywords: [
						`kick`,
						`step`,
						`walk`,
						`stomp`
					]
				},
				{
					emoji: `👂`,
					name: `ear`,
					keywords: [
						`hear`,
						`listen`,
						`sound`,
						`music`
					]
				},
				{
					emoji: `🦻`,
					name: `ear_with_hearing_aid`,
					keywords: [
						`deaf`,
						`accessibility`,
						`listen`,
						`device`
					]
				},
				{
					emoji: `👃`,
					name: `nose`,
					keywords: [
						`smell`,
						`sniff`,
						`scent`,
						`breath`
					]
				},
				{
					emoji: `🧠`,
					name: `brain`,
					keywords: [
						`smart`,
						`think`,
						`mind`,
						`intelligence`
					]
				},
				{
					emoji: `🫀`,
					name: `anatomical_heart`,
					keywords: [
						`organ`,
						`medical`,
						`body`,
						`pump`
					]
				},
				{
					emoji: `🫁`,
					name: `lungs`,
					keywords: [
						`breath`,
						`oxygen`,
						`air`,
						`respiratory`
					]
				},
				{
					emoji: `🦷`,
					name: `tooth`,
					keywords: [
						`dental`,
						`bite`,
						`dentist`,
						`smile`
					]
				},
				{
					emoji: `🦴`,
					name: `bone`,
					keywords: [
						`skeleton`,
						`body`,
						`xray`,
						`broken`
					]
				},
				{
					emoji: `👀`,
					name: `eyes`,
					keywords: [
						`look`,
						`see`,
						`watch`,
						`stare`,
						`peep`
					]
				},
				{
					emoji: `👁`,
					name: `eye`,
					keywords: [
						`look`,
						`see`,
						`watch`,
						`vision`
					]
				},
				{
					emoji: `👅`,
					name: `tongue`,
					keywords: [
						`taste`,
						`lick`,
						`silly`,
						`mouth`
					]
				},
				{
					emoji: `👄`,
					name: `mouth`,
					keywords: [
						`lips`,
						`kiss`,
						`speak`,
						`talk`
					]
				},
				{
					emoji: `🫦`,
					name: `biting_lip`,
					keywords: [
						`nervous`,
						`flirt`,
						`anxious`,
						`sexy`
					]
				},
				{
					emoji: `👶`,
					name: `baby`,
					keywords: [
						`child`,
						`infant`,
						`cute`,
						`newborn`
					]
				},
				{
					emoji: `🧒`,
					name: `child`,
					keywords: [
						`kid`,
						`young`,
						`boy`,
						`girl`
					]
				},
				{
					emoji: `👦`,
					name: `boy`,
					keywords: [
						`child`,
						`kid`,
						`male`,
						`son`,
						`young`
					]
				},
				{
					emoji: `👧`,
					name: `girl`,
					keywords: [
						`child`,
						`kid`,
						`female`,
						`daughter`,
						`young`
					]
				},
				{
					emoji: `🧑`,
					name: `person`,
					keywords: [
						`human`,
						`adult`,
						`people`,
						`individual`
					]
				},
				{
					emoji: `👱`,
					name: `person_blond_hair`,
					keywords: [
						`blonde`,
						`fair`,
						`golden`,
						`light`
					]
				},
				{
					emoji: `👨`,
					name: `man`,
					keywords: [
						`male`,
						`guy`,
						`father`,
						`adult`
					]
				},
				{
					emoji: `🧔`,
					name: `person_beard`,
					keywords: [
						`facial_hair`,
						`hipster`,
						`mustache`,
						`goatee`
					]
				},
				{
					emoji: `🧔‍♂️`,
					name: `man_beard`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧔‍♀️`,
					name: `woman_beard`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👨‍🦰`,
					name: `man_red_hair`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍🦱`,
					name: `man_curly_hair`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍🦳`,
					name: `man_white_hair`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍🦲`,
					name: `man_bald`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩`,
					name: `woman`,
					keywords: [
						`female`,
						`lady`,
						`mother`,
						`adult`
					]
				},
				{
					emoji: `👩‍🦰`,
					name: `woman_red_hair`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦰`,
					name: `person_red_hair`,
					keywords: [
						`person`,
						`red`,
						`hair`
					]
				},
				{
					emoji: `👩‍🦱`,
					name: `woman_curly_hair`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦱`,
					name: `person_curly_hair`,
					keywords: [
						`person`,
						`curly`,
						`hair`
					]
				},
				{
					emoji: `👩‍🦳`,
					name: `woman_white_hair`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦳`,
					name: `person_white_hair`,
					keywords: [
						`person`,
						`white`,
						`hair`
					]
				},
				{
					emoji: `👩‍🦲`,
					name: `woman_bald`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦲`,
					name: `person_bald`,
					keywords: [`person`, `bald`]
				},
				{
					emoji: `👱‍♀️`,
					name: `woman_blond_hair`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👱‍♂️`,
					name: `man_blond_hair`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧓`,
					name: `older_person`,
					keywords: [
						`senior`,
						`elder`,
						`grandparent`,
						`elderly`
					]
				},
				{
					emoji: `👴`,
					name: `old_man`,
					keywords: [
						`grandpa`,
						`grandfather`,
						`senior`,
						`elderly`
					]
				},
				{
					emoji: `👵`,
					name: `old_woman`,
					keywords: [
						`grandma`,
						`grandmother`,
						`senior`,
						`elderly`
					]
				},
				{
					emoji: `🙍`,
					name: `person_frowning`,
					keywords: [`person`, `frowning`]
				},
				{
					emoji: `🙍‍♂️`,
					name: `man_frowning`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🙍‍♀️`,
					name: `woman_frowning`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🙎`,
					name: `person_pouting`,
					keywords: [`person`, `pouting`]
				},
				{
					emoji: `🙎‍♂️`,
					name: `man_pouting`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🙎‍♀️`,
					name: `woman_pouting`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🙅`,
					name: `person_gesturing_no`,
					keywords: [`person`, `gesturing`]
				},
				{
					emoji: `🙅‍♂️`,
					name: `man_gesturing_no`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🙅‍♀️`,
					name: `woman_gesturing_no`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🙆`,
					name: `person_gesturing_ok`,
					keywords: [
						`yes`,
						`agree`,
						`good`,
						`nice`
					]
				},
				{
					emoji: `🙆‍♂️`,
					name: `man_gesturing_ok`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🙆‍♀️`,
					name: `woman_gesturing_ok`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `💁`,
					name: `person_tipping_hand`,
					keywords: [
						`person`,
						`tipping`,
						`fingers`,
						`palm`
					]
				},
				{
					emoji: `💁‍♂️`,
					name: `man_tipping_hand`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `💁‍♀️`,
					name: `woman_tipping_hand`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🙋`,
					name: `person_raising_hand`,
					keywords: [
						`person`,
						`raising`,
						`fingers`,
						`palm`
					]
				},
				{
					emoji: `🙋‍♂️`,
					name: `man_raising_hand`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🙋‍♀️`,
					name: `woman_raising_hand`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧏`,
					name: `deaf_person`,
					keywords: [`deaf`, `person`]
				},
				{
					emoji: `🧏‍♂️`,
					name: `deaf_man`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧏‍♀️`,
					name: `deaf_woman`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🙇`,
					name: `person_bowing`,
					keywords: [`person`, `bowing`]
				},
				{
					emoji: `🙇‍♂️`,
					name: `man_bowing`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🙇‍♀️`,
					name: `woman_bowing`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤦`,
					name: `person_facepalming`,
					keywords: [`person`, `facepalming`]
				},
				{
					emoji: `🤦‍♂️`,
					name: `man_facepalming`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤦‍♀️`,
					name: `woman_facepalming`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤷`,
					name: `person_shrugging`,
					keywords: [`person`, `shrugging`]
				},
				{
					emoji: `🤷‍♂️`,
					name: `man_shrugging`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤷‍♀️`,
					name: `woman_shrugging`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍⚕️`,
					name: `health_worker`,
					keywords: [`health`, `worker`]
				},
				{
					emoji: `👨‍⚕️`,
					name: `man_health_worker`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍⚕️`,
					name: `woman_health_worker`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🎓`,
					name: `student`,
					keywords: [
						`graduate`,
						`school`,
						`learn`,
						`study`
					]
				},
				{
					emoji: `👨‍🎓`,
					name: `man_student`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🎓`,
					name: `woman_student`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🏫`,
					name: `teacher`,
					keywords: [
						`professor`,
						`educator`,
						`school`,
						`instructor`
					]
				},
				{
					emoji: `👨‍🏫`,
					name: `man_teacher`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🏫`,
					name: `woman_teacher`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍⚖️`,
					name: `judge`,
					keywords: [`judge`]
				},
				{
					emoji: `👨‍⚖️`,
					name: `man_judge`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍⚖️`,
					name: `woman_judge`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🌾`,
					name: `farmer`,
					keywords: [`farmer`]
				},
				{
					emoji: `👨‍🌾`,
					name: `man_farmer`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🌾`,
					name: `woman_farmer`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🍳`,
					name: `cook`,
					keywords: [
						`chef`,
						`food`,
						`kitchen`,
						`culinary`
					]
				},
				{
					emoji: `👨‍🍳`,
					name: `man_cook`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🍳`,
					name: `woman_cook`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🔧`,
					name: `mechanic`,
					keywords: [`mechanic`]
				},
				{
					emoji: `👨‍🔧`,
					name: `man_mechanic`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🔧`,
					name: `woman_mechanic`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🏭`,
					name: `factory_worker`,
					keywords: [`factory`, `worker`]
				},
				{
					emoji: `👨‍🏭`,
					name: `man_factory_worker`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🏭`,
					name: `woman_factory_worker`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍💼`,
					name: `office_worker`,
					keywords: [
						`building`,
						`work`,
						`company`,
						`desk`
					]
				},
				{
					emoji: `👨‍💼`,
					name: `man_office_worker`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍💼`,
					name: `woman_office_worker`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🔬`,
					name: `scientist`,
					keywords: [
						`research`,
						`lab`,
						`experiment`,
						`chemistry`
					]
				},
				{
					emoji: `👨‍🔬`,
					name: `man_scientist`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🔬`,
					name: `woman_scientist`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍💻`,
					name: `technologist`,
					keywords: [
						`developer`,
						`coder`,
						`programmer`,
						`engineer`
					]
				},
				{
					emoji: `👨‍💻`,
					name: `man_technologist`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍💻`,
					name: `woman_technologist`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🎤`,
					name: `singer`,
					keywords: [`singer`]
				},
				{
					emoji: `👨‍🎤`,
					name: `man_singer`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🎤`,
					name: `woman_singer`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🎨`,
					name: `artist`,
					keywords: [
						`painter`,
						`creative`,
						`draw`,
						`art`
					]
				},
				{
					emoji: `👨‍🎨`,
					name: `man_artist`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🎨`,
					name: `woman_artist`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍✈️`,
					name: `pilot`,
					keywords: [`pilot`]
				},
				{
					emoji: `👨‍✈️`,
					name: `man_pilot`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍✈️`,
					name: `woman_pilot`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🚀`,
					name: `astronaut`,
					keywords: [
						`space`,
						`rocket`,
						`nasa`,
						`cosmos`
					]
				},
				{
					emoji: `👨‍🚀`,
					name: `man_astronaut`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🚀`,
					name: `woman_astronaut`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🚒`,
					name: `firefighter`,
					keywords: [`firefighter`]
				},
				{
					emoji: `👨‍🚒`,
					name: `man_firefighter`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🚒`,
					name: `woman_firefighter`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👮`,
					name: `police_officer`,
					keywords: [`police`, `officer`]
				},
				{
					emoji: `👮‍♂️`,
					name: `man_police_officer`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👮‍♀️`,
					name: `woman_police_officer`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🕵`,
					name: `detective`,
					keywords: [`detective`]
				},
				{
					emoji: `🕵️‍♂️`,
					name: `man_detective`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🕵️‍♀️`,
					name: `woman_detective`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `💂`,
					name: `guard`,
					keywords: [`guard`]
				},
				{
					emoji: `💂‍♂️`,
					name: `man_guard`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `💂‍♀️`,
					name: `woman_guard`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🥷`,
					name: `ninja`,
					keywords: [`ninja`]
				},
				{
					emoji: `👷`,
					name: `construction_worker`,
					keywords: [`construction`, `worker`]
				},
				{
					emoji: `👷‍♂️`,
					name: `man_construction_worker`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👷‍♀️`,
					name: `woman_construction_worker`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🫅`,
					name: `person_with_crown`,
					keywords: [`person`, `crown`]
				},
				{
					emoji: `🤴`,
					name: `prince`,
					keywords: [`prince`]
				},
				{
					emoji: `👸`,
					name: `princess`,
					keywords: [`princess`]
				},
				{
					emoji: `👳`,
					name: `person_wearing_turban`,
					keywords: [
						`person`,
						`wearing`,
						`turban`
					]
				},
				{
					emoji: `👳‍♂️`,
					name: `man_wearing_turban`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👳‍♀️`,
					name: `woman_wearing_turban`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👲`,
					name: `person_with_skullcap`,
					keywords: [`person`, `skullcap`]
				},
				{
					emoji: `🧕`,
					name: `woman_with_headscarf`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤵`,
					name: `person_in_tuxedo`,
					keywords: [`person`, `tuxedo`]
				},
				{
					emoji: `🤵‍♂️`,
					name: `man_in_tuxedo`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤵‍♀️`,
					name: `woman_in_tuxedo`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👰`,
					name: `person_with_veil`,
					keywords: [`person`, `veil`]
				},
				{
					emoji: `👰‍♂️`,
					name: `man_with_veil`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👰‍♀️`,
					name: `woman_with_veil`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤰`,
					name: `pregnant_woman`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🫃`,
					name: `pregnant_man`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🫄`,
					name: `pregnant_person`,
					keywords: [`pregnant`, `person`]
				},
				{
					emoji: `🤱`,
					name: `breast_feeding`,
					keywords: [`breast`, `feeding`]
				},
				{
					emoji: `👩‍🍼`,
					name: `woman_feeding_baby`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👨‍🍼`,
					name: `man_feeding_baby`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧑‍🍼`,
					name: `person_feeding_baby`,
					keywords: [
						`child`,
						`infant`,
						`kid`,
						`newborn`
					]
				},
				{
					emoji: `👼`,
					name: `baby_angel`,
					keywords: [
						`child`,
						`infant`,
						`kid`,
						`newborn`
					]
				},
				{
					emoji: `🎅`,
					name: `santa_claus`,
					keywords: [`santa`, `claus`]
				},
				{
					emoji: `🤶`,
					name: `mrs_claus`,
					keywords: [`mrs`, `claus`]
				},
				{
					emoji: `🧑‍🎄`,
					name: `mx_claus`,
					keywords: [`mx`, `claus`]
				},
				{
					emoji: `🦸`,
					name: `superhero`,
					keywords: [
						`hero`,
						`comic`,
						`power`,
						`save`
					]
				},
				{
					emoji: `🦸‍♂️`,
					name: `man_superhero`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🦸‍♀️`,
					name: `woman_superhero`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🦹`,
					name: `supervillain`,
					keywords: [
						`villain`,
						`evil`,
						`enemy`,
						`bad_guy`
					]
				},
				{
					emoji: `🦹‍♂️`,
					name: `man_supervillain`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🦹‍♀️`,
					name: `woman_supervillain`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧙`,
					name: `mage`,
					keywords: [`mage`]
				},
				{
					emoji: `🧙‍♂️`,
					name: `man_mage`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧙‍♀️`,
					name: `woman_mage`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧚`,
					name: `fairy`,
					keywords: [`fairy`]
				},
				{
					emoji: `🧚‍♂️`,
					name: `man_fairy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧚‍♀️`,
					name: `woman_fairy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧛`,
					name: `vampire`,
					keywords: [`vampire`]
				},
				{
					emoji: `🧛‍♂️`,
					name: `man_vampire`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧛‍♀️`,
					name: `woman_vampire`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧜`,
					name: `merperson`,
					keywords: [`merperson`]
				},
				{
					emoji: `🧜‍♂️`,
					name: `merman`,
					keywords: [`merman`]
				},
				{
					emoji: `🧜‍♀️`,
					name: `mermaid`,
					keywords: [`mermaid`]
				},
				{
					emoji: `🧝`,
					name: `elf`,
					keywords: [`elf`]
				},
				{
					emoji: `🧝‍♂️`,
					name: `man_elf`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧝‍♀️`,
					name: `woman_elf`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧞`,
					name: `genie`,
					keywords: [`genie`]
				},
				{
					emoji: `🧞‍♂️`,
					name: `man_genie`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧞‍♀️`,
					name: `woman_genie`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧟`,
					name: `zombie`,
					keywords: [`zombie`]
				},
				{
					emoji: `🧟‍♂️`,
					name: `man_zombie`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧟‍♀️`,
					name: `woman_zombie`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧌`,
					name: `troll`,
					keywords: [
						`fairy_tale`,
						`monster`,
						`mythical`,
						`creature`
					]
				},
				{
					emoji: `💆`,
					name: `person_getting_massage`,
					keywords: [
						`person`,
						`getting`,
						`massage`
					]
				},
				{
					emoji: `💆‍♂️`,
					name: `man_getting_massage`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `💆‍♀️`,
					name: `woman_getting_massage`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `💇`,
					name: `person_getting_haircut`,
					keywords: [
						`person`,
						`getting`,
						`haircut`
					]
				},
				{
					emoji: `💇‍♂️`,
					name: `man_getting_haircut`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `💇‍♀️`,
					name: `woman_getting_haircut`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🚶`,
					name: `person_walking`,
					keywords: [`person`, `walking`]
				},
				{
					emoji: `🚶‍♂️`,
					name: `man_walking`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🚶‍♀️`,
					name: `woman_walking`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧍`,
					name: `person_standing`,
					keywords: [`person`, `standing`]
				},
				{
					emoji: `🧍‍♂️`,
					name: `man_standing`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧍‍♀️`,
					name: `woman_standing`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧎`,
					name: `person_kneeling`,
					keywords: [`person`, `kneeling`]
				},
				{
					emoji: `🧎‍♂️`,
					name: `man_kneeling`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧎‍♀️`,
					name: `woman_kneeling`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦯`,
					name: `person_with_white_cane`,
					keywords: [
						`person`,
						`white`,
						`cane`
					]
				},
				{
					emoji: `👨‍🦯`,
					name: `man_with_white_cane`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🦯`,
					name: `woman_with_white_cane`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦼`,
					name: `person_in_motorized_wheelchair`,
					keywords: [
						`person`,
						`motorized`,
						`wheelchair`
					]
				},
				{
					emoji: `👨‍🦼`,
					name: `man_in_motorized_wheelchair`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🦼`,
					name: `woman_in_motorized_wheelchair`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧑‍🦽`,
					name: `person_in_manual_wheelchair`,
					keywords: [
						`person`,
						`manual`,
						`wheelchair`
					]
				},
				{
					emoji: `👨‍🦽`,
					name: `man_in_manual_wheelchair`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍🦽`,
					name: `woman_in_manual_wheelchair`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🏃`,
					name: `person_running`,
					keywords: [`person`, `running`]
				},
				{
					emoji: `🏃‍♂️`,
					name: `man_running`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🏃‍♀️`,
					name: `woman_running`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `💃`,
					name: `woman_dancing`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🕺`,
					name: `man_dancing`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🕴`,
					name: `person_in_suit_levitating`,
					keywords: [
						`person`,
						`suit`,
						`levitating`
					]
				},
				{
					emoji: `👯`,
					name: `people_with_bunny_ears`,
					keywords: [
						`people`,
						`bunny`,
						`ears`
					]
				},
				{
					emoji: `👯‍♂️`,
					name: `men_with_bunny_ears`,
					keywords: [
						`men`,
						`bunny`,
						`ears`
					]
				},
				{
					emoji: `👯‍♀️`,
					name: `women_with_bunny_ears`,
					keywords: [
						`women`,
						`bunny`,
						`ears`
					]
				},
				{
					emoji: `🧖`,
					name: `person_in_steamy_room`,
					keywords: [
						`person`,
						`steamy`,
						`room`
					]
				},
				{
					emoji: `🧖‍♂️`,
					name: `man_in_steamy_room`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧖‍♀️`,
					name: `woman_in_steamy_room`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧗`,
					name: `person_climbing`,
					keywords: [`person`, `climbing`]
				},
				{
					emoji: `🧗‍♂️`,
					name: `man_climbing`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧗‍♀️`,
					name: `woman_climbing`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤺`,
					name: `person_fencing`,
					keywords: [`person`, `fencing`]
				},
				{
					emoji: `🏇`,
					name: `horse_racing`,
					keywords: [`horse`, `racing`]
				},
				{
					emoji: `⛷️`,
					name: `skier`,
					keywords: [`skier`]
				},
				{
					emoji: `🏂`,
					name: `snowboarder`,
					keywords: [`snowboarder`]
				},
				{
					emoji: `🏌`,
					name: `person_golfing`,
					keywords: [`person`, `golfing`]
				},
				{
					emoji: `🏌️‍♂️`,
					name: `man_golfing`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🏌️‍♀️`,
					name: `woman_golfing`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🏄`,
					name: `person_surfing`,
					keywords: [`person`, `surfing`]
				},
				{
					emoji: `🏄‍♂️`,
					name: `man_surfing`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🏄‍♀️`,
					name: `woman_surfing`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🚣`,
					name: `person_rowing_boat`,
					keywords: [
						`person`,
						`rowing`,
						`boat`
					]
				},
				{
					emoji: `🚣‍♂️`,
					name: `man_rowing_boat`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🚣‍♀️`,
					name: `woman_rowing_boat`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🏊`,
					name: `person_swimming`,
					keywords: [`person`, `swimming`]
				},
				{
					emoji: `🏊‍♂️`,
					name: `man_swimming`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🏊‍♀️`,
					name: `woman_swimming`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `⛹️`,
					name: `person_bouncing_ball`,
					keywords: [
						`person`,
						`bouncing`,
						`ball`
					]
				},
				{
					emoji: `⛹️‍♂️`,
					name: `man_bouncing_ball`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `⛹️‍♀️`,
					name: `woman_bouncing_ball`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🏋`,
					name: `person_lifting_weights`,
					keywords: [
						`person`,
						`lifting`,
						`weights`
					]
				},
				{
					emoji: `🏋️‍♂️`,
					name: `man_lifting_weights`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🏋️‍♀️`,
					name: `woman_lifting_weights`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🚴`,
					name: `person_biking`,
					keywords: [`person`, `biking`]
				},
				{
					emoji: `🚴‍♂️`,
					name: `man_biking`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🚴‍♀️`,
					name: `woman_biking`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🚵`,
					name: `person_mountain_biking`,
					keywords: [
						`nature`,
						`peak`,
						`hike`,
						`climb`
					]
				},
				{
					emoji: `🚵‍♂️`,
					name: `man_mountain_biking`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🚵‍♀️`,
					name: `woman_mountain_biking`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤸`,
					name: `person_cartwheeling`,
					keywords: [`person`, `cartwheeling`]
				},
				{
					emoji: `🤸‍♂️`,
					name: `man_cartwheeling`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤸‍♀️`,
					name: `woman_cartwheeling`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤼`,
					name: `people_wrestling`,
					keywords: [`people`, `wrestling`]
				},
				{
					emoji: `🤼‍♂️`,
					name: `men_wrestling`,
					keywords: [`men`, `wrestling`]
				},
				{
					emoji: `🤼‍♀️`,
					name: `women_wrestling`,
					keywords: [`women`, `wrestling`]
				},
				{
					emoji: `🤽`,
					name: `person_playing_water_polo`,
					keywords: [
						`person`,
						`playing`,
						`water`,
						`polo`
					]
				},
				{
					emoji: `🤽‍♂️`,
					name: `man_playing_water_polo`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤽‍♀️`,
					name: `woman_playing_water_polo`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤾`,
					name: `person_playing_handball`,
					keywords: [
						`person`,
						`playing`,
						`handball`
					]
				},
				{
					emoji: `🤾‍♂️`,
					name: `man_playing_handball`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤾‍♀️`,
					name: `woman_playing_handball`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🤹`,
					name: `person_juggling`,
					keywords: [`person`, `juggling`]
				},
				{
					emoji: `🤹‍♂️`,
					name: `man_juggling`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🤹‍♀️`,
					name: `woman_juggling`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🧘`,
					name: `person_in_lotus_position`,
					keywords: [
						`flower`,
						`zen`,
						`water`,
						`plant`
					]
				},
				{
					emoji: `🧘‍♂️`,
					name: `man_in_lotus_position`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🧘‍♀️`,
					name: `woman_in_lotus_position`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `🛀`,
					name: `person_taking_bath`,
					keywords: [
						`person`,
						`taking`,
						`bath`
					]
				},
				{
					emoji: `🛌`,
					name: `person_in_bed`,
					keywords: [`person`, `bed`]
				},
				{
					emoji: `🧑‍🤝‍🧑`,
					name: `people_holding_hands`,
					keywords: [
						`people`,
						`holding`,
						`hands`
					]
				},
				{
					emoji: `👭`,
					name: `women_holding_hands`,
					keywords: [
						`women`,
						`holding`,
						`hands`
					]
				},
				{
					emoji: `👫`,
					name: `woman_and_man_holding_hands`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👬`,
					name: `men_holding_hands`,
					keywords: [
						`men`,
						`holding`,
						`hands`
					]
				},
				{
					emoji: `💏`,
					name: `kiss`,
					keywords: [`kiss`, `kissing`]
				},
				{
					emoji: `👩‍❤️‍💋‍👨`,
					name: `kiss_woman_man`,
					keywords: [
						`kissing`,
						`female`,
						`lady`,
						`person`
					]
				},
				{
					emoji: `👨‍❤️‍💋‍👨`,
					name: `kiss_man_man`,
					keywords: [
						`kissing`,
						`male`,
						`guy`,
						`person`
					]
				},
				{
					emoji: `👩‍❤️‍💋‍👩`,
					name: `kiss_woman_woman`,
					keywords: [
						`kissing`,
						`female`,
						`lady`,
						`person`
					]
				},
				{
					emoji: `💑`,
					name: `couple_with_heart`,
					keywords: [
						`couple`,
						`heart`,
						`love`
					]
				},
				{
					emoji: `👩‍❤️‍👨`,
					name: `couple_with_heart_woman_man`,
					keywords: [
						`love`,
						`female`,
						`lady`,
						`person`
					]
				},
				{
					emoji: `👨‍❤️‍👨`,
					name: `couple_with_heart_man_man`,
					keywords: [
						`love`,
						`male`,
						`guy`,
						`person`
					]
				},
				{
					emoji: `👩‍❤️‍👩`,
					name: `couple_with_heart_woman_woman`,
					keywords: [
						`love`,
						`female`,
						`lady`,
						`person`
					]
				},
				{
					emoji: `👨‍👩‍👦`,
					name: `family_man_woman_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👩‍👧`,
					name: `family_man_woman_girl`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👩‍👧‍👦`,
					name: `family_man_woman_girl_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👩‍👦‍👦`,
					name: `family_man_woman_boy_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👩‍👧‍👧`,
					name: `family_man_woman_girl_girl`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👨‍👦`,
					name: `family_man_man_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👨‍👧`,
					name: `family_man_man_girl`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👨‍👧‍👦`,
					name: `family_man_man_girl_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👨‍👦‍👦`,
					name: `family_man_man_boy_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👨‍👧‍👧`,
					name: `family_man_man_girl_girl`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍👩‍👦`,
					name: `family_woman_woman_boy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👩‍👩‍👧`,
					name: `family_woman_woman_girl`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍👩‍👧‍👦`,
					name: `family_woman_woman_girl_boy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍👩‍👦‍👦`,
					name: `family_woman_woman_boy_boy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👩‍👩‍👧‍👧`,
					name: `family_woman_woman_girl_girl`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👦`,
					name: `family_man_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👦‍👦`,
					name: `family_man_boy_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👧`,
					name: `family_man_girl`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👧‍👦`,
					name: `family_man_girl_boy`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👨‍👧‍👧`,
					name: `family_man_girl_girl`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍👦`,
					name: `family_woman_boy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👩‍👦‍👦`,
					name: `family_woman_boy_boy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`girl`
					]
				},
				{
					emoji: `👩‍👧`,
					name: `family_woman_girl`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍👧‍👦`,
					name: `family_woman_girl_boy`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👩‍👧‍👧`,
					name: `family_woman_girl_girl`,
					keywords: [
						`female`,
						`lady`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `👪`,
					name: `family`,
					keywords: [`family`]
				},
				{
					emoji: `🗣`,
					name: `speaking_head`,
					keywords: [`speaking`, `head`]
				},
				{
					emoji: `👤`,
					name: `bust_in_silhouette`,
					keywords: [`bust`, `silhouette`]
				},
				{
					emoji: `👥`,
					name: `busts_in_silhouette`,
					keywords: [`busts`, `silhouette`]
				},
				{
					emoji: `🫂`,
					name: `people_hugging`,
					keywords: [`people`, `hugging`]
				},
				{
					emoji: `👣`,
					name: `footprints`,
					keywords: [`footprints`]
				}
			]
		},
		{
			id: `animals`,
			key: `animals`,
			icon: `🐱`,
			items: [
				{
					emoji: `🐵`,
					name: `monkey_face`,
					keywords: [
						`ape`,
						`primate`,
						`funny`,
						`banana`
					]
				},
				{
					emoji: `🐒`,
					name: `monkey`,
					keywords: [
						`ape`,
						`primate`,
						`clever`,
						`swing`
					]
				},
				{
					emoji: `🦍`,
					name: `gorilla`,
					keywords: [
						`ape`,
						`strong`,
						`primate`,
						`king_kong`
					]
				},
				{
					emoji: `🦧`,
					name: `orangutan`,
					keywords: [
						`ape`,
						`primate`,
						`red`,
						`jungle`
					]
				},
				{
					emoji: `🐶`,
					name: `dog_face`,
					keywords: [
						`puppy`,
						`pet`,
						`cute`,
						`woof`
					]
				},
				{
					emoji: `🐕`,
					name: `dog`,
					keywords: [
						`puppy`,
						`pet`,
						`loyal`,
						`woof`
					]
				},
				{
					emoji: `🦮`,
					name: `guide_dog`,
					keywords: [
						`blind`,
						`assist`,
						`service`,
						`help`
					]
				},
				{
					emoji: `🐕‍🦺`,
					name: `service_dog`,
					keywords: [
						`assist`,
						`help`,
						`therapy`,
						`support`
					]
				},
				{
					emoji: `🐩`,
					name: `poodle`,
					keywords: [
						`dog`,
						`fancy`,
						`pet`,
						`curly`
					]
				},
				{
					emoji: `🐺`,
					name: `wolf`,
					keywords: [
						`howl`,
						`wild`,
						`pack`,
						`predator`
					]
				},
				{
					emoji: `🦊`,
					name: `fox`,
					keywords: [
						`clever`,
						`cunning`,
						`cute`,
						`wild`
					]
				},
				{
					emoji: `🦝`,
					name: `raccoon`,
					keywords: [
						`trash_panda`,
						`cute`,
						`mask`,
						`nocturnal`
					]
				},
				{
					emoji: `🐱`,
					name: `cat_face`,
					keywords: [
						`kitty`,
						`meow`,
						`pet`,
						`cute`
					]
				},
				{
					emoji: `🐈`,
					name: `cat`,
					keywords: [
						`kitty`,
						`meow`,
						`pet`,
						`feline`
					]
				},
				{
					emoji: `🐈‍⬛`,
					name: `black_cat`,
					keywords: [
						`kitty`,
						`halloween`,
						`spooky`,
						`luck`
					]
				},
				{
					emoji: `🦁`,
					name: `lion`,
					keywords: [
						`king`,
						`wild`,
						`brave`,
						`pride`
					]
				},
				{
					emoji: `🐯`,
					name: `tiger_face`,
					keywords: [
						`stripes`,
						`wild`,
						`fierce`,
						`roar`
					]
				},
				{
					emoji: `🐅`,
					name: `tiger`,
					keywords: [
						`stripes`,
						`wild`,
						`fierce`,
						`power`
					]
				},
				{
					emoji: `🐆`,
					name: `leopard`,
					keywords: [
						`spots`,
						`fast`,
						`wild`,
						`big_cat`
					]
				},
				{
					emoji: `🐴`,
					name: `horse_face`,
					keywords: [
						`pony`,
						`ride`,
						`stable`,
						`neigh`
					]
				},
				{
					emoji: `🐎`,
					name: `horse`,
					keywords: [
						`pony`,
						`ride`,
						`race`,
						`gallop`
					]
				},
				{
					emoji: `🦄`,
					name: `unicorn`,
					keywords: [
						`magic`,
						`fantasy`,
						`rainbow`,
						`mythical`
					]
				},
				{
					emoji: `🦓`,
					name: `zebra`,
					keywords: [
						`stripes`,
						`black_white`,
						`africa`,
						`wild`
					]
				},
				{
					emoji: `🦌`,
					name: `deer`,
					keywords: [
						`bambi`,
						`forest`,
						`antler`,
						`graceful`
					]
				},
				{
					emoji: `🦬`,
					name: `bison`,
					keywords: [
						`buffalo`,
						`wild`,
						`strong`,
						`prairie`
					]
				},
				{
					emoji: `🐮`,
					name: `cow_face`,
					keywords: [
						`moo`,
						`milk`,
						`farm`,
						`cattle`
					]
				},
				{
					emoji: `🐂`,
					name: `ox`,
					keywords: [
						`strong`,
						`farm`,
						`bull`,
						`plow`
					]
				},
				{
					emoji: `🐃`,
					name: `water_buffalo`,
					keywords: [
						`farm`,
						`asia`,
						`strong`,
						`rice`
					]
				},
				{
					emoji: `🐄`,
					name: `cow`,
					keywords: [
						`milk`,
						`farm`,
						`dairy`,
						`cattle`
					]
				},
				{
					emoji: `🐷`,
					name: `pig_face`,
					keywords: [
						`oink`,
						`farm`,
						`cute`,
						`pink`
					]
				},
				{
					emoji: `🐖`,
					name: `pig`,
					keywords: [
						`oink`,
						`farm`,
						`pork`,
						`bacon`
					]
				},
				{
					emoji: `🐗`,
					name: `boar`,
					keywords: [
						`wild`,
						`tusks`,
						`forest`,
						`fierce`
					]
				},
				{
					emoji: `🐽`,
					name: `pig_nose`,
					keywords: [
						`oink`,
						`snout`,
						`cute`,
						`piggy`
					]
				},
				{
					emoji: `🐏`,
					name: `ram`,
					keywords: [
						`sheep`,
						`horns`,
						`stubborn`,
						`aries`
					]
				},
				{
					emoji: `🐑`,
					name: `ewe`,
					keywords: [
						`sheep`,
						`wool`,
						`soft`,
						`lamb`
					]
				},
				{
					emoji: `🐐`,
					name: `goat`,
					keywords: [
						`stubborn`,
						`climb`,
						`mountain`,
						`farm`
					]
				},
				{
					emoji: `🐪`,
					name: `camel`,
					keywords: [
						`desert`,
						`hump`,
						`travel`,
						`sand`
					]
				},
				{
					emoji: `🐫`,
					name: `two_hump_camel`,
					keywords: [
						`desert`,
						`hump`,
						`travel`,
						`silk_road`
					]
				},
				{
					emoji: `🦙`,
					name: `llama`,
					keywords: [
						`alpaca`,
						`cute`,
						`south_america`,
						`fluffy`
					]
				},
				{
					emoji: `🦒`,
					name: `giraffe`,
					keywords: [
						`tall`,
						`spots`,
						`africa`,
						`long_neck`
					]
				},
				{
					emoji: `🐘`,
					name: `elephant`,
					keywords: [
						`big`,
						`memory`,
						`trunk`,
						`africa`
					]
				},
				{
					emoji: `🦣`,
					name: `mammoth`,
					keywords: [
						`extinct`,
						`ice_age`,
						`ancient`,
						`tusks`
					]
				},
				{
					emoji: `🦏`,
					name: `rhinoceros`,
					keywords: [
						`horn`,
						`thick_skin`,
						`africa`,
						`strong`
					]
				},
				{
					emoji: `🦛`,
					name: `hippopotamus`,
					keywords: [
						`river`,
						`big`,
						`africa`,
						`water`
					]
				},
				{
					emoji: `🐭`,
					name: `mouse_face`,
					keywords: [
						`tiny`,
						`cute`,
						`cheese`,
						`squeak`
					]
				},
				{
					emoji: `🐁`,
					name: `mouse`,
					keywords: [
						`tiny`,
						`rodent`,
						`cheese`,
						`squeak`
					]
				},
				{
					emoji: `🐀`,
					name: `rat`,
					keywords: [
						`rodent`,
						`smart`,
						`city`,
						`nocturnal`
					]
				},
				{
					emoji: `🐹`,
					name: `hamster`,
					keywords: [
						`pet`,
						`cute`,
						`wheel`,
						`fluffy`
					]
				},
				{
					emoji: `🐰`,
					name: `rabbit_face`,
					keywords: [
						`bunny`,
						`cute`,
						`hop`,
						`easter`
					]
				},
				{
					emoji: `🐇`,
					name: `rabbit`,
					keywords: [
						`bunny`,
						`hop`,
						`fast`,
						`easter`
					]
				},
				{
					emoji: `🐿`,
					name: `chipmunk`,
					keywords: [
						`squirrel`,
						`nuts`,
						`cute`,
						`cheeks`
					]
				},
				{
					emoji: `🦫`,
					name: `beaver`,
					keywords: [
						`dam`,
						`wood`,
						`build`,
						`teeth`
					]
				},
				{
					emoji: `🦔`,
					name: `hedgehog`,
					keywords: [
						`spiky`,
						`cute`,
						`curl`,
						`sonic`
					]
				},
				{
					emoji: `🦇`,
					name: `bat`,
					keywords: [
						`vampire`,
						`night`,
						`fly`,
						`halloween`
					]
				},
				{
					emoji: `🐻`,
					name: `bear`,
					keywords: [
						`grizzly`,
						`strong`,
						`wild`,
						`teddy`
					]
				},
				{
					emoji: `🐻‍❄️`,
					name: `polar_bear`,
					keywords: [
						`arctic`,
						`white`,
						`ice`,
						`cold`
					]
				},
				{
					emoji: `🐨`,
					name: `koala`,
					keywords: [
						`australia`,
						`cute`,
						`sleep`,
						`eucalyptus`
					]
				},
				{
					emoji: `🐼`,
					name: `panda`,
					keywords: [
						`china`,
						`cute`,
						`bamboo`,
						`bear`
					]
				},
				{
					emoji: `🦥`,
					name: `sloth`,
					keywords: [
						`slow`,
						`lazy`,
						`sleep`,
						`chill`
					]
				},
				{
					emoji: `🦦`,
					name: `otter`,
					keywords: [
						`cute`,
						`swim`,
						`playful`,
						`water`
					]
				},
				{
					emoji: `🦨`,
					name: `skunk`,
					keywords: [
						`stink`,
						`spray`,
						`black_white`,
						`smell`
					]
				},
				{
					emoji: `🦘`,
					name: `kangaroo`,
					keywords: [
						`australia`,
						`jump`,
						`pouch`,
						`joey`
					]
				},
				{
					emoji: `🦡`,
					name: `badger`,
					keywords: [
						`dig`,
						`brave`,
						`nocturnal`,
						`forest`
					]
				},
				{
					emoji: `🐾`,
					name: `paw_prints`,
					keywords: [
						`pet`,
						`animal`,
						`track`,
						`footprint`
					]
				},
				{
					emoji: `🦃`,
					name: `turkey`,
					keywords: [
						`thanksgiving`,
						`bird`,
						`gobble`,
						`feast`
					]
				},
				{
					emoji: `🐔`,
					name: `chicken`,
					keywords: [
						`hen`,
						`farm`,
						`egg`,
						`cluck`
					]
				},
				{
					emoji: `🐓`,
					name: `rooster`,
					keywords: [
						`cock`,
						`dawn`,
						`morning`,
						`farm`
					]
				},
				{
					emoji: `🐣`,
					name: `hatching_chick`,
					keywords: [
						`baby`,
						`bird`,
						`born`,
						`new`
					]
				},
				{
					emoji: `🐤`,
					name: `baby_chick`,
					keywords: [
						`bird`,
						`cute`,
						`yellow`,
						`small`
					]
				},
				{
					emoji: `🐥`,
					name: `front_facing_baby_chick`,
					keywords: [
						`bird`,
						`cute`,
						`yellow`,
						`baby`
					]
				},
				{
					emoji: `🐦`,
					name: `bird`,
					keywords: [
						`fly`,
						`sing`,
						`tweet`,
						`wing`
					]
				},
				{
					emoji: `🐧`,
					name: `penguin`,
					keywords: [
						`arctic`,
						`cute`,
						`waddle`,
						`tuxedo`
					]
				},
				{
					emoji: `🕊`,
					name: `dove`,
					keywords: [
						`peace`,
						`white`,
						`hope`,
						`freedom`
					]
				},
				{
					emoji: `🦅`,
					name: `eagle`,
					keywords: [
						`freedom`,
						`soar`,
						`majestic`,
						`america`
					]
				},
				{
					emoji: `🦆`,
					name: `duck`,
					keywords: [
						`quack`,
						`swim`,
						`pond`,
						`waddle`
					]
				},
				{
					emoji: `🦢`,
					name: `swan`,
					keywords: [
						`elegant`,
						`graceful`,
						`lake`,
						`white`
					]
				},
				{
					emoji: `🦉`,
					name: `owl`,
					keywords: [
						`wise`,
						`night`,
						`hoot`,
						`nocturnal`
					]
				},
				{
					emoji: `🦤`,
					name: `dodo`,
					keywords: [
						`extinct`,
						`bird`,
						`clumsy`,
						`flightless`
					]
				},
				{
					emoji: `🪶`,
					name: `feather`,
					keywords: [
						`light`,
						`soft`,
						`fly`,
						`bird`
					]
				},
				{
					emoji: `🦩`,
					name: `flamingo`,
					keywords: [
						`pink`,
						`tropical`,
						`elegant`,
						`leg`
					]
				},
				{
					emoji: `🦚`,
					name: `peacock`,
					keywords: [
						`beautiful`,
						`display`,
						`feathers`,
						`proud`
					]
				},
				{
					emoji: `🦜`,
					name: `parrot`,
					keywords: [
						`talk`,
						`colorful`,
						`tropical`,
						`mimic`
					]
				},
				{
					emoji: `🐸`,
					name: `frog`,
					keywords: [
						`ribbit`,
						`hop`,
						`green`,
						`pond`
					]
				},
				{
					emoji: `🐊`,
					name: `crocodile`,
					keywords: [
						`dangerous`,
						`jaws`,
						`reptile`,
						`swamp`
					]
				},
				{
					emoji: `🐢`,
					name: `turtle`,
					keywords: [
						`slow`,
						`shell`,
						`wise`,
						`ocean`
					]
				},
				{
					emoji: `🦎`,
					name: `lizard`,
					keywords: [
						`reptile`,
						`crawl`,
						`gecko`,
						`chameleon`
					]
				},
				{
					emoji: `🐍`,
					name: `snake`,
					keywords: [
						`serpent`,
						`slither`,
						`venom`,
						`hiss`
					]
				},
				{
					emoji: `🐲`,
					name: `dragon_face`,
					keywords: [
						`mythical`,
						`fire`,
						`fantasy`,
						`power`
					]
				},
				{
					emoji: `🐉`,
					name: `dragon`,
					keywords: [
						`mythical`,
						`fire`,
						`eastern`,
						`legend`
					]
				},
				{
					emoji: `🦕`,
					name: `sauropod`,
					keywords: [
						`dinosaur`,
						`big`,
						`ancient`,
						`long_neck`
					]
				},
				{
					emoji: `🦖`,
					name: `t_rex`,
					keywords: [
						`dinosaur`,
						`fierce`,
						`ancient`,
						`jurassic`
					]
				},
				{
					emoji: `🐳`,
					name: `spouting_whale`,
					keywords: [
						`ocean`,
						`big`,
						`water`,
						`spray`
					]
				},
				{
					emoji: `🐋`,
					name: `whale`,
					keywords: [
						`ocean`,
						`huge`,
						`marine`,
						`deep`
					]
				},
				{
					emoji: `🐬`,
					name: `dolphin`,
					keywords: [
						`smart`,
						`ocean`,
						`playful`,
						`swim`
					]
				},
				{
					emoji: `🦭`,
					name: `seal`,
					keywords: [
						`cute`,
						`ocean`,
						`arctic`,
						`swim`
					]
				},
				{
					emoji: `🐟`,
					name: `fish`,
					keywords: [
						`swim`,
						`ocean`,
						`water`,
						`aquarium`
					]
				},
				{
					emoji: `🐠`,
					name: `tropical_fish`,
					keywords: [
						`colorful`,
						`reef`,
						`aquarium`,
						`nemo`
					]
				},
				{
					emoji: `🐡`,
					name: `blowfish`,
					keywords: [
						`puffer`,
						`spiky`,
						`ocean`,
						`toxic`
					]
				},
				{
					emoji: `🦈`,
					name: `shark`,
					keywords: [
						`danger`,
						`ocean`,
						`jaws`,
						`predator`
					]
				},
				{
					emoji: `🐙`,
					name: `octopus`,
					keywords: [
						`tentacle`,
						`ocean`,
						`smart`,
						`ink`
					]
				},
				{
					emoji: `🐚`,
					name: `spiral_shell`,
					keywords: [
						`beach`,
						`ocean`,
						`conch`,
						`sea`
					]
				},
				{
					emoji: `🪸`,
					name: `coral`,
					keywords: [
						`reef`,
						`ocean`,
						`colorful`,
						`marine`
					]
				},
				{
					emoji: `🦀`,
					name: `crab`,
					keywords: [
						`seafood`,
						`pinch`,
						`beach`,
						`zodiac`
					]
				},
				{
					emoji: `🦞`,
					name: `lobster`,
					keywords: [
						`seafood`,
						`luxury`,
						`red`,
						`fancy`
					]
				},
				{
					emoji: `🦐`,
					name: `shrimp`,
					keywords: [
						`seafood`,
						`prawn`,
						`small`,
						`cook`
					]
				},
				{
					emoji: `🦑`,
					name: `squid`,
					keywords: [
						`seafood`,
						`tentacle`,
						`calamari`,
						`ocean`
					]
				},
				{
					emoji: `🦪`,
					name: `oyster`,
					keywords: [
						`seafood`,
						`pearl`,
						`raw`,
						`luxury`
					]
				},
				{
					emoji: `🐌`,
					name: `snail`,
					keywords: [
						`slow`,
						`shell`,
						`slime`,
						`garden`
					]
				},
				{
					emoji: `🦋`,
					name: `butterfly`,
					keywords: [
						`beautiful`,
						`transform`,
						`colorful`,
						`garden`
					]
				},
				{
					emoji: `🐛`,
					name: `bug`,
					keywords: [
						`insect`,
						`crawl`,
						`creepy`,
						`nature`
					]
				},
				{
					emoji: `🐜`,
					name: `ant`,
					keywords: [
						`tiny`,
						`strong`,
						`colony`,
						`work`
					]
				},
				{
					emoji: `🐝`,
					name: `honeybee`,
					keywords: [
						`honey`,
						`buzz`,
						`sting`,
						`pollinate`
					]
				},
				{
					emoji: `🪲`,
					name: `beetle`,
					keywords: [
						`insect`,
						`shell`,
						`crawl`,
						`garden`
					]
				},
				{
					emoji: `🐞`,
					name: `lady_beetle`,
					keywords: [
						`ladybug`,
						`lucky`,
						`red`,
						`spots`
					]
				},
				{
					emoji: `🦗`,
					name: `cricket`,
					keywords: [
						`chirp`,
						`night`,
						`jump`,
						`insect`
					]
				},
				{
					emoji: `🪳`,
					name: `cockroach`,
					keywords: [
						`pest`,
						`gross`,
						`bug`,
						`indestructible`
					]
				},
				{
					emoji: `🕷`,
					name: `spider`,
					keywords: [
						`web`,
						`creepy`,
						`eight_legs`,
						`halloween`
					]
				},
				{
					emoji: `🕸`,
					name: `spider_web`,
					keywords: [
						`trap`,
						`halloween`,
						`sticky`,
						`spooky`
					]
				},
				{
					emoji: `🦂`,
					name: `scorpion`,
					keywords: [
						`sting`,
						`desert`,
						`danger`,
						`zodiac`
					]
				},
				{
					emoji: `🦟`,
					name: `mosquito`,
					keywords: [
						`bite`,
						`itch`,
						`buzz`,
						`blood`
					]
				},
				{
					emoji: `🪰`,
					name: `fly`,
					keywords: [
						`buzz`,
						`pest`,
						`annoying`,
						`insect`
					]
				},
				{
					emoji: `🪱`,
					name: `worm`,
					keywords: [
						`soil`,
						`fish_bait`,
						`crawl`,
						`garden`
					]
				},
				{
					emoji: `🦠`,
					name: `microbe`,
					keywords: [
						`germ`,
						`bacteria`,
						`virus`,
						`microscope`
					]
				},
				{
					emoji: `💐`,
					name: `bouquet`,
					keywords: [
						`flowers`,
						`gift`,
						`romance`,
						`beautiful`
					]
				},
				{
					emoji: `🌸`,
					name: `cherry_blossom`,
					keywords: [
						`spring`,
						`japan`,
						`pink`,
						`beautiful`
					]
				},
				{
					emoji: `💮`,
					name: `white_flower`,
					keywords: [
						`japan`,
						`pure`,
						`score`,
						`mark`
					]
				},
				{
					emoji: `🪷`,
					name: `lotus`,
					keywords: [
						`zen`,
						`pure`,
						`meditation`,
						`water`
					]
				},
				{
					emoji: `🏵`,
					name: `rosette`,
					keywords: [
						`award`,
						`prize`,
						`flower`,
						`decoration`
					]
				},
				{
					emoji: `🌹`,
					name: `rose`,
					keywords: [
						`love`,
						`romance`,
						`valentine`,
						`beautiful`
					]
				},
				{
					emoji: `🥀`,
					name: `wilted_flower`,
					keywords: [
						`dead`,
						`sad`,
						`fade`,
						`heartbreak`
					]
				},
				{
					emoji: `🌺`,
					name: `hibiscus`,
					keywords: [
						`tropical`,
						`hawaii`,
						`beautiful`,
						`summer`
					]
				},
				{
					emoji: `🌻`,
					name: `sunflower`,
					keywords: [
						`sun`,
						`happy`,
						`summer`,
						`bright`
					]
				},
				{
					emoji: `🌼`,
					name: `blossom`,
					keywords: [
						`spring`,
						`flower`,
						`bloom`,
						`pretty`
					]
				},
				{
					emoji: `🌷`,
					name: `tulip`,
					keywords: [
						`spring`,
						`dutch`,
						`elegant`,
						`garden`
					]
				},
				{
					emoji: `🌱`,
					name: `seedling`,
					keywords: [
						`grow`,
						`new`,
						`plant`,
						`hope`
					]
				},
				{
					emoji: `🪴`,
					name: `potted_plant`,
					keywords: [
						`indoor`,
						`green`,
						`home`,
						`decor`
					]
				},
				{
					emoji: `🌲`,
					name: `evergreen_tree`,
					keywords: [
						`pine`,
						`christmas`,
						`forest`,
						`green`
					]
				},
				{
					emoji: `🌳`,
					name: `deciduous_tree`,
					keywords: [
						`nature`,
						`forest`,
						`shade`,
						`green`
					]
				},
				{
					emoji: `🌴`,
					name: `palm_tree`,
					keywords: [
						`tropical`,
						`beach`,
						`vacation`,
						`island`
					]
				},
				{
					emoji: `🌵`,
					name: `cactus`,
					keywords: [
						`desert`,
						`prickly`,
						`dry`,
						`tough`
					]
				},
				{
					emoji: `🌾`,
					name: `sheaf_of_rice`,
					keywords: [
						`harvest`,
						`farm`,
						`grain`,
						`autumn`
					]
				},
				{
					emoji: `🌿`,
					name: `herb`,
					keywords: [
						`plant`,
						`green`,
						`natural`,
						`cooking`
					]
				},
				{
					emoji: `☘️`,
					name: `shamrock`,
					keywords: [
						`ireland`,
						`lucky`,
						`green`,
						`saint_patrick`
					]
				},
				{
					emoji: `🍀`,
					name: `four_leaf_clover`,
					keywords: [
						`lucky`,
						`rare`,
						`fortune`,
						`wish`
					]
				},
				{
					emoji: `🍁`,
					name: `maple_leaf`,
					keywords: [
						`autumn`,
						`canada`,
						`fall`,
						`red`
					]
				},
				{
					emoji: `🍂`,
					name: `fallen_leaf`,
					keywords: [
						`autumn`,
						`fall`,
						`wind`,
						`brown`
					]
				},
				{
					emoji: `🍃`,
					name: `leaf_fluttering_in_wind`,
					keywords: [
						`nature`,
						`breeze`,
						`fresh`,
						`green`
					]
				},
				{
					emoji: `🪹`,
					name: `empty_nest`,
					keywords: [
						`home`,
						`gone`,
						`bird`,
						`empty`
					]
				},
				{
					emoji: `🪺`,
					name: `nest_with_eggs`,
					keywords: [
						`bird`,
						`baby`,
						`spring`,
						`new_life`
					]
				},
				{
					emoji: `🍄`,
					name: `mushroom`,
					keywords: [
						`fungus`,
						`forest`,
						`fairy`,
						`nature`
					]
				}
			]
		},
		{
			id: `food`,
			key: `food`,
			icon: `🍔`,
			items: [
				{
					emoji: `🍇`,
					name: `grapes`,
					keywords: [
						`fruit`,
						`purple`,
						`wine`,
						`sweet`
					]
				},
				{
					emoji: `🍈`,
					name: `melon`,
					keywords: [
						`fruit`,
						`sweet`,
						`summer`,
						`honeydew`
					]
				},
				{
					emoji: `🍉`,
					name: `watermelon`,
					keywords: [
						`fruit`,
						`summer`,
						`refreshing`,
						`sweet`
					]
				},
				{
					emoji: `🍊`,
					name: `tangerine`,
					keywords: [
						`fruit`,
						`orange`,
						`citrus`,
						`vitamin`
					]
				},
				{
					emoji: `🍋`,
					name: `lemon`,
					keywords: [
						`fruit`,
						`sour`,
						`citrus`,
						`yellow`
					]
				},
				{
					emoji: `🍌`,
					name: `banana`,
					keywords: [
						`fruit`,
						`yellow`,
						`potassium`,
						`snack`
					]
				},
				{
					emoji: `🍍`,
					name: `pineapple`,
					keywords: [
						`fruit`,
						`tropical`,
						`sweet`,
						`hawaii`
					]
				},
				{
					emoji: `🥭`,
					name: `mango`,
					keywords: [
						`fruit`,
						`tropical`,
						`sweet`,
						`juicy`
					]
				},
				{
					emoji: `🍎`,
					name: `red_apple`,
					keywords: [
						`fruit`,
						`healthy`,
						`teacher`,
						`sweet`
					]
				},
				{
					emoji: `🍏`,
					name: `green_apple`,
					keywords: [
						`fruit`,
						`sour`,
						`healthy`,
						`crisp`
					]
				},
				{
					emoji: `🍐`,
					name: `pear`,
					keywords: [
						`fruit`,
						`green`,
						`sweet`,
						`juicy`
					]
				},
				{
					emoji: `🍑`,
					name: `peach`,
					keywords: [
						`fruit`,
						`pink`,
						`sweet`,
						`soft`
					]
				},
				{
					emoji: `🍒`,
					name: `cherries`,
					keywords: [
						`fruit`,
						`red`,
						`sweet`,
						`pair`
					]
				},
				{
					emoji: `🍓`,
					name: `strawberry`,
					keywords: [
						`fruit`,
						`red`,
						`sweet`,
						`berry`
					]
				},
				{
					emoji: `🫐`,
					name: `blueberries`,
					keywords: [
						`fruit`,
						`blue`,
						`berry`,
						`healthy`
					]
				},
				{
					emoji: `🥝`,
					name: `kiwi_fruit`,
					keywords: [
						`fruit`,
						`green`,
						`fuzzy`,
						`vitamin`
					]
				},
				{
					emoji: `🍅`,
					name: `tomato`,
					keywords: [
						`vegetable`,
						`red`,
						`sauce`,
						`salad`
					]
				},
				{
					emoji: `🫒`,
					name: `olive`,
					keywords: [
						`oil`,
						`mediterranean`,
						`green`,
						`healthy`
					]
				},
				{
					emoji: `🥥`,
					name: `coconut`,
					keywords: [
						`tropical`,
						`milk`,
						`palm`,
						`shell`
					]
				},
				{
					emoji: `🥑`,
					name: `avocado`,
					keywords: [
						`healthy`,
						`green`,
						`toast`,
						`guacamole`
					]
				},
				{
					emoji: `🍆`,
					name: `eggplant`,
					keywords: [
						`vegetable`,
						`purple`,
						`aubergine`,
						`cook`
					]
				},
				{
					emoji: `🥔`,
					name: `potato`,
					keywords: [
						`vegetable`,
						`starch`,
						`fries`,
						`bake`
					]
				},
				{
					emoji: `🥕`,
					name: `carrot`,
					keywords: [
						`vegetable`,
						`orange`,
						`rabbit`,
						`vitamin`
					]
				},
				{
					emoji: `🌽`,
					name: `ear_of_corn`,
					keywords: [
						`vegetable`,
						`yellow`,
						`farm`,
						`popcorn`
					]
				},
				{
					emoji: `🌶`,
					name: `hot_pepper`,
					keywords: [
						`spicy`,
						`chili`,
						`hot`,
						`sauce`
					]
				},
				{
					emoji: `🫑`,
					name: `bell_pepper`,
					keywords: [
						`vegetable`,
						`green`,
						`red`,
						`cook`
					]
				},
				{
					emoji: `🥒`,
					name: `cucumber`,
					keywords: [
						`vegetable`,
						`green`,
						`fresh`,
						`salad`
					]
				},
				{
					emoji: `🥬`,
					name: `leafy_green`,
					keywords: [
						`vegetable`,
						`healthy`,
						`salad`,
						`diet`
					]
				},
				{
					emoji: `🥦`,
					name: `broccoli`,
					keywords: [
						`vegetable`,
						`green`,
						`healthy`,
						`tree`
					]
				},
				{
					emoji: `🧄`,
					name: `garlic`,
					keywords: [
						`flavor`,
						`cook`,
						`pungent`,
						`vampire`
					]
				},
				{
					emoji: `🧅`,
					name: `onion`,
					keywords: [
						`flavor`,
						`cook`,
						`cry`,
						`layers`
					]
				},
				{
					emoji: `🥜`,
					name: `peanuts`,
					keywords: [
						`nut`,
						`snack`,
						`protein`,
						`butter`
					]
				},
				{
					emoji: `🫘`,
					name: `beans`,
					keywords: [
						`protein`,
						`legume`,
						`fiber`,
						`cook`
					]
				},
				{
					emoji: `🌰`,
					name: `chestnut`,
					keywords: [
						`nut`,
						`autumn`,
						`roast`,
						`brown`
					]
				},
				{
					emoji: `🍞`,
					name: `bread`,
					keywords: [
						`bakery`,
						`toast`,
						`carbs`,
						`staple`
					]
				},
				{
					emoji: `🥐`,
					name: `croissant`,
					keywords: [
						`french`,
						`pastry`,
						`breakfast`,
						`butter`
					]
				},
				{
					emoji: `🥖`,
					name: `baguette_bread`,
					keywords: [
						`french`,
						`long`,
						`bakery`,
						`crusty`
					]
				},
				{
					emoji: `🫓`,
					name: `flatbread`,
					keywords: [
						`naan`,
						`pita`,
						`wrap`,
						`tortilla`
					]
				},
				{
					emoji: `🥨`,
					name: `pretzel`,
					keywords: [
						`snack`,
						`german`,
						`salty`,
						`twisted`
					]
				},
				{
					emoji: `🥯`,
					name: `bagel`,
					keywords: [
						`bread`,
						`breakfast`,
						`round`,
						`cream_cheese`
					]
				},
				{
					emoji: `🥞`,
					name: `pancakes`,
					keywords: [
						`breakfast`,
						`syrup`,
						`stack`,
						`fluffy`
					]
				},
				{
					emoji: `🧇`,
					name: `waffle`,
					keywords: [
						`breakfast`,
						`grid`,
						`syrup`,
						`sweet`
					]
				},
				{
					emoji: `🧀`,
					name: `cheese_wedge`,
					keywords: [
						`dairy`,
						`yellow`,
						`swiss`,
						`mouse`
					]
				},
				{
					emoji: `🍖`,
					name: `meat_on_bone`,
					keywords: [
						`bbq`,
						`steak`,
						`grill`,
						`protein`
					]
				},
				{
					emoji: `🍗`,
					name: `poultry_leg`,
					keywords: [
						`chicken`,
						`fried`,
						`drumstick`,
						`turkey`
					]
				},
				{
					emoji: `🥩`,
					name: `cut_of_meat`,
					keywords: [
						`steak`,
						`beef`,
						`raw`,
						`butcher`
					]
				},
				{
					emoji: `🥓`,
					name: `bacon`,
					keywords: [
						`pork`,
						`breakfast`,
						`crispy`,
						`salty`
					]
				},
				{
					emoji: `🍔`,
					name: `hamburger`,
					keywords: [
						`fast_food`,
						`beef`,
						`meal`,
						`bun`
					]
				},
				{
					emoji: `🍟`,
					name: `french_fries`,
					keywords: [
						`fast_food`,
						`potato`,
						`snack`,
						`salty`
					]
				},
				{
					emoji: `🍕`,
					name: `pizza`,
					keywords: [
						`italian`,
						`cheese`,
						`slice`,
						`pepperoni`
					]
				},
				{
					emoji: `🌭`,
					name: `hot_dog`,
					keywords: [
						`sausage`,
						`bun`,
						`mustard`,
						`fast_food`
					]
				},
				{
					emoji: `🥪`,
					name: `sandwich`,
					keywords: [
						`lunch`,
						`bread`,
						`meal`,
						`deli`
					]
				},
				{
					emoji: `🌮`,
					name: `taco`,
					keywords: [
						`mexican`,
						`spicy`,
						`shell`,
						`filling`
					]
				},
				{
					emoji: `🌯`,
					name: `burrito`,
					keywords: [
						`mexican`,
						`wrap`,
						`beans`,
						`rice`
					]
				},
				{
					emoji: `🫔`,
					name: `tamale`,
					keywords: [
						`mexican`,
						`corn`,
						`wrapped`,
						`steamed`
					]
				},
				{
					emoji: `🥙`,
					name: `stuffed_flatbread`,
					keywords: [
						`falafel`,
						`pita`,
						`middle_east`,
						`wrap`
					]
				},
				{
					emoji: `🧆`,
					name: `falafel`,
					keywords: [
						`middle_east`,
						`fried`,
						`chickpea`,
						`vegan`
					]
				},
				{
					emoji: `🥚`,
					name: `egg`,
					keywords: [
						`breakfast`,
						`protein`,
						`chicken`,
						`cook`
					]
				},
				{
					emoji: `🍳`,
					name: `cooking`,
					keywords: [
						`fry`,
						`breakfast`,
						`pan`,
						`chef`
					]
				},
				{
					emoji: `🥘`,
					name: `shallow_pan_of_food`,
					keywords: [
						`paella`,
						`stir_fry`,
						`cook`,
						`meal`
					]
				},
				{
					emoji: `🍲`,
					name: `pot_of_food`,
					keywords: [
						`stew`,
						`soup`,
						`cook`,
						`warm`
					]
				},
				{
					emoji: `🫕`,
					name: `fondue`,
					keywords: [
						`cheese`,
						`swiss`,
						`dip`,
						`melted`
					]
				},
				{
					emoji: `🥣`,
					name: `bowl_with_spoon`,
					keywords: [
						`cereal`,
						`breakfast`,
						`soup`,
						`porridge`
					]
				},
				{
					emoji: `🥗`,
					name: `green_salad`,
					keywords: [
						`healthy`,
						`diet`,
						`vegetable`,
						`fresh`
					]
				},
				{
					emoji: `🍿`,
					name: `popcorn`,
					keywords: [
						`movie`,
						`snack`,
						`cinema`,
						`butter`
					]
				},
				{
					emoji: `🧈`,
					name: `butter`,
					keywords: [
						`spread`,
						`toast`,
						`cook`,
						`dairy`
					]
				},
				{
					emoji: `🧂`,
					name: `salt`,
					keywords: [
						`seasoning`,
						`flavor`,
						`cook`,
						`mineral`
					]
				},
				{
					emoji: `🥫`,
					name: `canned_food`,
					keywords: [
						`preserved`,
						`soup`,
						`storage`,
						`pantry`
					]
				},
				{
					emoji: `🍱`,
					name: `bento_box`,
					keywords: [
						`japanese`,
						`lunch`,
						`rice`,
						`meal`
					]
				},
				{
					emoji: `🍘`,
					name: `rice_cracker`,
					keywords: [
						`japanese`,
						`snack`,
						`seaweed`,
						`crispy`
					]
				},
				{
					emoji: `🍙`,
					name: `rice_ball`,
					keywords: [
						`japanese`,
						`onigiri`,
						`seaweed`,
						`lunch`
					]
				},
				{
					emoji: `🍚`,
					name: `cooked_rice`,
					keywords: [
						`bowl`,
						`asian`,
						`meal`,
						`staple`
					]
				},
				{
					emoji: `🍛`,
					name: `curry_rice`,
					keywords: [
						`indian`,
						`japanese`,
						`spicy`,
						`meal`
					]
				},
				{
					emoji: `🍜`,
					name: `steaming_bowl`,
					keywords: [
						`ramen`,
						`noodle`,
						`soup`,
						`hot`
					]
				},
				{
					emoji: `🍝`,
					name: `spaghetti`,
					keywords: [
						`italian`,
						`pasta`,
						`tomato`,
						`meatball`
					]
				},
				{
					emoji: `🍠`,
					name: `roasted_sweet_potato`,
					keywords: [
						`baked`,
						`autumn`,
						`snack`,
						`yam`
					]
				},
				{
					emoji: `🍢`,
					name: `oden`,
					keywords: [
						`japanese`,
						`stew`,
						`winter`,
						`skewer`
					]
				},
				{
					emoji: `🍣`,
					name: `sushi`,
					keywords: [
						`japanese`,
						`raw`,
						`fish`,
						`rice`
					]
				},
				{
					emoji: `🍤`,
					name: `fried_shrimp`,
					keywords: [
						`tempura`,
						`seafood`,
						`crispy`,
						`japanese`
					]
				},
				{
					emoji: `🍥`,
					name: `fish_cake_with_swirl`,
					keywords: [
						`japanese`,
						`ramen`,
						`pink`,
						`narutomaki`
					]
				},
				{
					emoji: `🥮`,
					name: `moon_cake`,
					keywords: [
						`chinese`,
						`mid_autumn`,
						`festival`,
						`round`
					]
				},
				{
					emoji: `🍡`,
					name: `dango`,
					keywords: [
						`japanese`,
						`sweet`,
						`mochi`,
						`skewer`
					]
				},
				{
					emoji: `🥟`,
					name: `dumpling`,
					keywords: [
						`chinese`,
						`gyoza`,
						`steam`,
						`filling`
					]
				},
				{
					emoji: `🥠`,
					name: `fortune_cookie`,
					keywords: [
						`chinese`,
						`lucky`,
						`message`,
						`dessert`
					]
				},
				{
					emoji: `🥡`,
					name: `takeout_box`,
					keywords: [
						`chinese`,
						`delivery`,
						`noodle`,
						`meal`
					]
				},
				{
					emoji: `🍦`,
					name: `soft_ice_cream`,
					keywords: [
						`dessert`,
						`cone`,
						`summer`,
						`cold`
					]
				},
				{
					emoji: `🍧`,
					name: `shaved_ice`,
					keywords: [
						`summer`,
						`cold`,
						`sweet`,
						`refreshing`
					]
				},
				{
					emoji: `🍨`,
					name: `ice_cream`,
					keywords: [
						`dessert`,
						`sundae`,
						`sweet`,
						`cold`
					]
				},
				{
					emoji: `🍩`,
					name: `doughnut`,
					keywords: [
						`sweet`,
						`fried`,
						`sprinkles`,
						`breakfast`
					]
				},
				{
					emoji: `🍪`,
					name: `cookie`,
					keywords: [
						`sweet`,
						`bake`,
						`snack`,
						`chocolate`
					]
				},
				{
					emoji: `🎂`,
					name: `birthday_cake`,
					keywords: [
						`party`,
						`celebrate`,
						`candle`,
						`wish`
					]
				},
				{
					emoji: `🍰`,
					name: `shortcake`,
					keywords: [
						`strawberry`,
						`dessert`,
						`cream`,
						`sweet`
					]
				},
				{
					emoji: `🧁`,
					name: `cupcake`,
					keywords: [
						`sweet`,
						`small`,
						`frosting`,
						`bake`
					]
				},
				{
					emoji: `🥧`,
					name: `pie`,
					keywords: [
						`dessert`,
						`apple`,
						`bake`,
						`slice`
					]
				},
				{
					emoji: `🍫`,
					name: `chocolate_bar`,
					keywords: [
						`sweet`,
						`candy`,
						`cocoa`,
						`snack`
					]
				},
				{
					emoji: `🍬`,
					name: `candy`,
					keywords: [
						`sweet`,
						`sugar`,
						`treat`,
						`wrapper`
					]
				},
				{
					emoji: `🍭`,
					name: `lollipop`,
					keywords: [
						`sweet`,
						`candy`,
						`colorful`,
						`stick`
					]
				},
				{
					emoji: `🍮`,
					name: `custard`,
					keywords: [
						`pudding`,
						`dessert`,
						`caramel`,
						`sweet`
					]
				},
				{
					emoji: `🍯`,
					name: `honey_pot`,
					keywords: [
						`sweet`,
						`bee`,
						`natural`,
						`golden`
					]
				},
				{
					emoji: `🍼`,
					name: `baby_bottle`,
					keywords: [
						`milk`,
						`infant`,
						`feed`,
						`drink`
					]
				},
				{
					emoji: `🥛`,
					name: `glass_of_milk`,
					keywords: [
						`dairy`,
						`drink`,
						`white`,
						`calcium`
					]
				},
				{
					emoji: `☕`,
					name: `hot_beverage`,
					keywords: [
						`coffee`,
						`tea`,
						`morning`,
						`warm`
					]
				},
				{
					emoji: `🫖`,
					name: `teapot`,
					keywords: [
						`tea`,
						`brew`,
						`ceramic`,
						`pour`
					]
				},
				{
					emoji: `🍵`,
					name: `teacup_without_handle`,
					keywords: [
						`tea`,
						`green`,
						`japanese`,
						`matcha`
					]
				},
				{
					emoji: `🍶`,
					name: `sake`,
					keywords: [
						`japanese`,
						`alcohol`,
						`rice`,
						`drink`
					]
				},
				{
					emoji: `🍾`,
					name: `bottle_with_popping_cork`,
					keywords: [
						`champagne`,
						`celebrate`,
						`toast`,
						`new_year`
					]
				},
				{
					emoji: `🍷`,
					name: `wine_glass`,
					keywords: [
						`red_wine`,
						`dinner`,
						`romantic`,
						`cheers`
					]
				},
				{
					emoji: `🍸`,
					name: `cocktail_glass`,
					keywords: [
						`martini`,
						`bar`,
						`party`,
						`drink`
					]
				},
				{
					emoji: `🍹`,
					name: `tropical_drink`,
					keywords: [
						`vacation`,
						`beach`,
						`umbrella`,
						`fruity`
					]
				},
				{
					emoji: `🍺`,
					name: `beer_mug`,
					keywords: [
						`pub`,
						`cheers`,
						`drink`,
						`bar`
					]
				},
				{
					emoji: `🍻`,
					name: `clinking_beer_mugs`,
					keywords: [
						`cheers`,
						`toast`,
						`celebrate`,
						`friends`
					]
				},
				{
					emoji: `🥂`,
					name: `clinking_glasses`,
					keywords: [
						`toast`,
						`celebrate`,
						`cheers`,
						`party`
					]
				},
				{
					emoji: `🥃`,
					name: `tumbler_glass`,
					keywords: [
						`whiskey`,
						`bourbon`,
						`rocks`,
						`neat`
					]
				},
				{
					emoji: `🫗`,
					name: `pouring_liquid`,
					keywords: [
						`pour`,
						`water`,
						`drink`,
						`fill`
					]
				},
				{
					emoji: `🥤`,
					name: `cup_with_straw`,
					keywords: [
						`soda`,
						`drink`,
						`bubble_tea`,
						`refreshing`
					]
				},
				{
					emoji: `🧋`,
					name: `bubble_tea`,
					keywords: [
						`boba`,
						`milk_tea`,
						`tapioca`,
						`drink`
					]
				},
				{
					emoji: `🧃`,
					name: `beverage_box`,
					keywords: [
						`juice`,
						`kids`,
						`straw`,
						`drink`
					]
				},
				{
					emoji: `🧉`,
					name: `mate`,
					keywords: [
						`south_america`,
						`tea`,
						`gourd`,
						`caffeine`
					]
				},
				{
					emoji: `🧊`,
					name: `ice`,
					keywords: [
						`cold`,
						`freeze`,
						`cube`,
						`drink`
					]
				},
				{
					emoji: `🥢`,
					name: `chopsticks`,
					keywords: [
						`asian`,
						`chinese`,
						`japanese`,
						`eat`
					]
				},
				{
					emoji: `🍽`,
					name: `fork_and_knife_with_plate`,
					keywords: [
						`dinner`,
						`meal`,
						`restaurant`,
						`eat`
					]
				},
				{
					emoji: `🍴`,
					name: `fork_and_knife`,
					keywords: [
						`eat`,
						`meal`,
						`western`,
						`dinner`
					]
				},
				{
					emoji: `🥄`,
					name: `spoon`,
					keywords: [
						`eat`,
						`soup`,
						`scoop`,
						`stir`
					]
				},
				{
					emoji: `🔪`,
					name: `kitchen_knife`,
					keywords: [`kitchen`, `knife`]
				},
				{
					emoji: `🫙`,
					name: `jar`,
					keywords: [
						`container`,
						`store`,
						`glass`,
						`preserve`
					]
				},
				{
					emoji: `🏺`,
					name: `amphora`,
					keywords: [`amphora`]
				}
			]
		},
		{
			id: `travel`,
			key: `travel`,
			icon: `✈️`,
			items: [
				{
					emoji: `🌍`,
					name: `globe_showing_europe_africa`,
					keywords: [
						`world`,
						`earth`,
						`planet`,
						`global`
					]
				},
				{
					emoji: `🌎`,
					name: `globe_showing_americas`,
					keywords: [
						`world`,
						`earth`,
						`western`,
						`hemisphere`
					]
				},
				{
					emoji: `🌏`,
					name: `globe_showing_asia_australia`,
					keywords: [
						`world`,
						`earth`,
						`eastern`,
						`hemisphere`
					]
				},
				{
					emoji: `🌐`,
					name: `globe_with_meridians`,
					keywords: [
						`world`,
						`internet`,
						`web`,
						`global`
					]
				},
				{
					emoji: `🗺`,
					name: `world_map`,
					keywords: [
						`travel`,
						`geography`,
						`earth`,
						`explore`
					]
				},
				{
					emoji: `🗾`,
					name: `map_of_japan`,
					keywords: [
						`tokyo`,
						`asia`,
						`island`,
						`travel`
					]
				},
				{
					emoji: `🧭`,
					name: `compass`,
					keywords: [
						`direction`,
						`navigate`,
						`north`,
						`explore`
					]
				},
				{
					emoji: `🏔`,
					name: `snow_capped_mountain`,
					keywords: [
						`peak`,
						`snow`,
						`winter`,
						`alpine`
					]
				},
				{
					emoji: `⛰️`,
					name: `mountain`,
					keywords: [
						`peak`,
						`hike`,
						`climb`,
						`nature`
					]
				},
				{
					emoji: `🌋`,
					name: `volcano`,
					keywords: [
						`eruption`,
						`lava`,
						`hot`,
						`danger`
					]
				},
				{
					emoji: `🗻`,
					name: `mount_fuji`,
					keywords: [
						`japan`,
						`snow`,
						`iconic`,
						`sacred`
					]
				},
				{
					emoji: `🏕`,
					name: `camping`,
					keywords: [
						`tent`,
						`outdoor`,
						`nature`,
						`sleep`
					]
				},
				{
					emoji: `🏖`,
					name: `beach_with_umbrella`,
					keywords: [
						`vacation`,
						`sand`,
						`ocean`,
						`summer`
					]
				},
				{
					emoji: `🏜`,
					name: `desert`,
					keywords: [
						`sand`,
						`dry`,
						`hot`,
						`cactus`
					]
				},
				{
					emoji: `🏝`,
					name: `desert_island`,
					keywords: [
						`tropical`,
						`palm`,
						`stranded`,
						`paradise`
					]
				},
				{
					emoji: `🏞`,
					name: `national_park`,
					keywords: [
						`nature`,
						`scenic`,
						`trees`,
						`outdoor`
					]
				},
				{
					emoji: `🏟`,
					name: `stadium`,
					keywords: [
						`sports`,
						`concert`,
						`arena`,
						`event`
					]
				},
				{
					emoji: `🏛`,
					name: `classical_building`,
					keywords: [
						`museum`,
						`government`,
						`greek`,
						`historic`
					]
				},
				{
					emoji: `🏗`,
					name: `building_construction`,
					keywords: [
						`work`,
						`crane`,
						`develop`,
						`site`
					]
				},
				{
					emoji: `🧱`,
					name: `brick`,
					keywords: [
						`build`,
						`wall`,
						`red`,
						`construction`
					]
				},
				{
					emoji: `🪨`,
					name: `rock`,
					keywords: [
						`stone`,
						`boulder`,
						`hard`,
						`mountain`
					]
				},
				{
					emoji: `🪵`,
					name: `wood`,
					keywords: [
						`log`,
						`timber`,
						`tree`,
						`chop`
					]
				},
				{
					emoji: `🛖`,
					name: `hut`,
					keywords: [
						`cabin`,
						`shelter`,
						`rural`,
						`simple`
					]
				},
				{
					emoji: `🏘`,
					name: `houses`,
					keywords: [
						`neighborhood`,
						`suburb`,
						`residential`,
						`town`
					]
				},
				{
					emoji: `🏚`,
					name: `derelict_house`,
					keywords: [
						`abandoned`,
						`haunted`,
						`old`,
						`broken`
					]
				},
				{
					emoji: `🏠`,
					name: `house`,
					keywords: [
						`home`,
						`live`,
						`shelter`,
						`family`
					]
				},
				{
					emoji: `🏡`,
					name: `house_with_garden`,
					keywords: [
						`home`,
						`yard`,
						`suburb`,
						`green`
					]
				},
				{
					emoji: `🏢`,
					name: `office_building`,
					keywords: [
						`work`,
						`company`,
						`corporate`,
						`business`
					]
				},
				{
					emoji: `🏣`,
					name: `japanese_post_office`,
					keywords: [
						`mail`,
						`letter`,
						`japan`,
						`postal`
					]
				},
				{
					emoji: `🏤`,
					name: `post_office`,
					keywords: [
						`mail`,
						`letter`,
						`send`,
						`postal`
					]
				},
				{
					emoji: `🏥`,
					name: `hospital`,
					keywords: [
						`building`,
						`health`,
						`medical`,
						`doctor`
					]
				},
				{
					emoji: `🏦`,
					name: `bank`,
					keywords: [
						`money`,
						`finance`,
						`savings`,
						`atm`
					]
				},
				{
					emoji: `🏨`,
					name: `hotel`,
					keywords: [
						`stay`,
						`sleep`,
						`travel`,
						`room`
					]
				},
				{
					emoji: `🏩`,
					name: `love_hotel`,
					keywords: [
						`romance`,
						`couple`,
						`stay`,
						`heart`
					]
				},
				{
					emoji: `🏪`,
					name: `convenience_store`,
					keywords: [
						`shop`,
						`buy`,
						`24h`,
						`snack`
					]
				},
				{
					emoji: `🏫`,
					name: `school`,
					keywords: [
						`building`,
						`education`,
						`learn`,
						`student`
					]
				},
				{
					emoji: `🏬`,
					name: `department_store`,
					keywords: [
						`shop`,
						`mall`,
						`buy`,
						`retail`
					]
				},
				{
					emoji: `🏭`,
					name: `factory`,
					keywords: [
						`industry`,
						`manufacture`,
						`work`,
						`produce`
					]
				},
				{
					emoji: `🏯`,
					name: `japanese_castle`,
					keywords: [
						`japan`,
						`historic`,
						`samurai`,
						`fortress`
					]
				},
				{
					emoji: `🏰`,
					name: `castle`,
					keywords: [
						`medieval`,
						`king`,
						`fortress`,
						`fairy_tale`
					]
				},
				{
					emoji: `💒`,
					name: `wedding`,
					keywords: [
						`marriage`,
						`bride`,
						`love`,
						`ceremony`
					]
				},
				{
					emoji: `🗼`,
					name: `tokyo_tower`,
					keywords: [
						`japan`,
						`landmark`,
						`red`,
						`tall`
					]
				},
				{
					emoji: `🗽`,
					name: `statue_of_liberty`,
					keywords: [
						`usa`,
						`new_york`,
						`freedom`,
						`landmark`
					]
				},
				{
					emoji: `⛪`,
					name: `church`,
					keywords: [
						`building`,
						`religion`,
						`pray`,
						`faith`
					]
				},
				{
					emoji: `🕌`,
					name: `mosque`,
					keywords: [
						`islam`,
						`prayer`,
						`religion`,
						`worship`
					]
				},
				{
					emoji: `🛕`,
					name: `hindu_temple`,
					keywords: [
						`india`,
						`religion`,
						`worship`,
						`spiritual`
					]
				},
				{
					emoji: `🕍`,
					name: `synagogue`,
					keywords: [
						`jewish`,
						`prayer`,
						`religion`,
						`worship`
					]
				},
				{
					emoji: `⛩️`,
					name: `shinto_shrine`,
					keywords: [
						`japan`,
						`torii`,
						`prayer`,
						`spiritual`
					]
				},
				{
					emoji: `🕋`,
					name: `kaaba`,
					keywords: [
						`islam`,
						`mecca`,
						`pilgrimage`,
						`holy`
					]
				},
				{
					emoji: `⛲`,
					name: `fountain`,
					keywords: [
						`water`,
						`park`,
						`splash`,
						`decoration`
					]
				},
				{
					emoji: `⛺`,
					name: `tent`,
					keywords: [
						`camp`,
						`outdoor`,
						`shelter`,
						`hike`
					]
				},
				{
					emoji: `🌁`,
					name: `foggy`,
					keywords: [
						`mist`,
						`haze`,
						`unclear`,
						`weather`
					]
				},
				{
					emoji: `🌃`,
					name: `night_with_stars`,
					keywords: [
						`dark`,
						`sky`,
						`evening`,
						`city`
					]
				},
				{
					emoji: `🏙`,
					name: `cityscape`,
					keywords: [
						`urban`,
						`skyline`,
						`buildings`,
						`city`
					]
				},
				{
					emoji: `🌄`,
					name: `sunrise_over_mountains`,
					keywords: [
						`morning`,
						`dawn`,
						`beautiful`,
						`nature`
					]
				},
				{
					emoji: `🌅`,
					name: `sunrise`,
					keywords: [
						`morning`,
						`dawn`,
						`new_day`,
						`early`
					]
				},
				{
					emoji: `🌆`,
					name: `cityscape_at_dusk`,
					keywords: [
						`evening`,
						`sunset`,
						`skyline`,
						`golden`
					]
				},
				{
					emoji: `🌇`,
					name: `sunset`,
					keywords: [
						`evening`,
						`dusk`,
						`golden`,
						`beautiful`
					]
				},
				{
					emoji: `🌉`,
					name: `bridge_at_night`,
					keywords: [
						`river`,
						`city`,
						`lights`,
						`beautiful`
					]
				},
				{
					emoji: `♨️`,
					name: `hot_springs`,
					keywords: [
						`bath`,
						`relax`,
						`onsen`,
						`steam`
					]
				},
				{
					emoji: `🎠`,
					name: `carousel_horse`,
					keywords: [
						`amusement`,
						`ride`,
						`fun`,
						`childhood`
					]
				},
				{
					emoji: `🛝`,
					name: `playground_slide`,
					keywords: [
						`kids`,
						`fun`,
						`park`,
						`play`
					]
				},
				{
					emoji: `🎡`,
					name: `ferris_wheel`,
					keywords: [
						`amusement`,
						`view`,
						`ride`,
						`fun`
					]
				},
				{
					emoji: `🎢`,
					name: `roller_coaster`,
					keywords: [
						`thrill`,
						`ride`,
						`amusement`,
						`exciting`
					]
				},
				{
					emoji: `💈`,
					name: `barber_pole`,
					keywords: [
						`haircut`,
						`salon`,
						`hair`,
						`trim`
					]
				},
				{
					emoji: `🎪`,
					name: `circus_tent`,
					keywords: [
						`show`,
						`performance`,
						`clown`,
						`fun`
					]
				},
				{
					emoji: `🚂`,
					name: `locomotive`,
					keywords: [
						`train`,
						`steam`,
						`vintage`,
						`choo_choo`
					]
				},
				{
					emoji: `🚃`,
					name: `railway_car`,
					keywords: [
						`train`,
						`ride`,
						`commute`,
						`rail`
					]
				},
				{
					emoji: `🚄`,
					name: `high_speed_train`,
					keywords: [
						`fast`,
						`bullet`,
						`rail`,
						`travel`
					]
				},
				{
					emoji: `🚅`,
					name: `bullet_train`,
					keywords: [
						`fast`,
						`japan`,
						`rail`,
						`shinkansen`
					]
				},
				{
					emoji: `🚆`,
					name: `train`,
					keywords: [
						`rail`,
						`commute`,
						`travel`,
						`ride`
					]
				},
				{
					emoji: `🚇`,
					name: `metro`,
					keywords: [
						`subway`,
						`underground`,
						`commute`,
						`city`
					]
				},
				{
					emoji: `🚈`,
					name: `light_rail`,
					keywords: [
						`tram`,
						`train`,
						`transit`,
						`commute`
					]
				},
				{
					emoji: `🚉`,
					name: `station`,
					keywords: [
						`train`,
						`platform`,
						`commute`,
						`wait`
					]
				},
				{
					emoji: `🚊`,
					name: `tram`,
					keywords: [
						`streetcar`,
						`transit`,
						`city`,
						`ride`
					]
				},
				{
					emoji: `🚝`,
					name: `monorail`,
					keywords: [
						`train`,
						`elevated`,
						`transit`,
						`modern`
					]
				},
				{
					emoji: `🚞`,
					name: `mountain_railway`,
					keywords: [
						`scenic`,
						`train`,
						`altitude`,
						`climb`
					]
				},
				{
					emoji: `🚋`,
					name: `tram_car`,
					keywords: [
						`streetcar`,
						`transit`,
						`city`,
						`vintage`
					]
				},
				{
					emoji: `🚌`,
					name: `bus`,
					keywords: [
						`vehicle`,
						`public_transport`,
						`ride`,
						`coach`
					]
				},
				{
					emoji: `🚍`,
					name: `oncoming_bus`,
					keywords: [
						`vehicle`,
						`public_transport`,
						`ride`,
						`coach`
					]
				},
				{
					emoji: `🚎`,
					name: `trolleybus`,
					keywords: [
						`electric`,
						`bus`,
						`transit`,
						`city`
					]
				},
				{
					emoji: `🚐`,
					name: `minibus`,
					keywords: [
						`small`,
						`bus`,
						`shuttle`,
						`transport`
					]
				},
				{
					emoji: `🚑`,
					name: `ambulance`,
					keywords: [
						`emergency`,
						`hospital`,
						`siren`,
						`rescue`
					]
				},
				{
					emoji: `🚒`,
					name: `fire_engine`,
					keywords: [
						`emergency`,
						`firefighter`,
						`rescue`,
						`red`
					]
				},
				{
					emoji: `🚓`,
					name: `police_car`,
					keywords: [
						`law`,
						`emergency`,
						`cop`,
						`siren`
					]
				},
				{
					emoji: `🚔`,
					name: `oncoming_police_car`,
					keywords: [
						`law`,
						`emergency`,
						`cop`,
						`siren`
					]
				},
				{
					emoji: `🚕`,
					name: `taxi`,
					keywords: [
						`cab`,
						`vehicle`,
						`transport`,
						`yellow`
					]
				},
				{
					emoji: `🚖`,
					name: `oncoming_taxi`,
					keywords: [
						`cab`,
						`vehicle`,
						`transport`,
						`yellow`
					]
				},
				{
					emoji: `🚗`,
					name: `automobile`,
					keywords: [
						`car`,
						`drive`,
						`road`,
						`vehicle`
					]
				},
				{
					emoji: `🚘`,
					name: `oncoming_automobile`,
					keywords: [
						`car`,
						`drive`,
						`road`,
						`coming`
					]
				},
				{
					emoji: `🚙`,
					name: `sport_utility_vehicle`,
					keywords: [
						`suv`,
						`truck`,
						`offroad`,
						`big`
					]
				},
				{
					emoji: `🛻`,
					name: `pickup_truck`,
					keywords: [
						`haul`,
						`work`,
						`country`,
						`vehicle`
					]
				},
				{
					emoji: `🚚`,
					name: `delivery_truck`,
					keywords: [
						`shipping`,
						`package`,
						`transport`,
						`move`
					]
				},
				{
					emoji: `🚛`,
					name: `articulated_lorry`,
					keywords: [
						`semi`,
						`truck`,
						`freight`,
						`haul`
					]
				},
				{
					emoji: `🚜`,
					name: `tractor`,
					keywords: [
						`farm`,
						`field`,
						`agriculture`,
						`rural`
					]
				},
				{
					emoji: `🏎`,
					name: `racing_car`,
					keywords: [
						`fast`,
						`speed`,
						`formula1`,
						`race`
					]
				},
				{
					emoji: `🏍`,
					name: `motorcycle`,
					keywords: [
						`bike`,
						`ride`,
						`speed`,
						`biker`
					]
				},
				{
					emoji: `🛵`,
					name: `motor_scooter`,
					keywords: [
						`vespa`,
						`ride`,
						`city`,
						`commute`
					]
				},
				{
					emoji: `🦽`,
					name: `manual_wheelchair`,
					keywords: [`manual`, `wheelchair`]
				},
				{
					emoji: `🦼`,
					name: `motorized_wheelchair`,
					keywords: [`motorized`, `wheelchair`]
				},
				{
					emoji: `🛺`,
					name: `auto_rickshaw`,
					keywords: [
						`tuk_tuk`,
						`india`,
						`taxi`,
						`ride`
					]
				},
				{
					emoji: `🚲`,
					name: `bicycle`,
					keywords: [
						`bike`,
						`ride`,
						`pedal`,
						`eco`
					]
				},
				{
					emoji: `🛴`,
					name: `kick_scooter`,
					keywords: [
						`ride`,
						`electric`,
						`commute`,
						`fun`
					]
				},
				{
					emoji: `🛹`,
					name: `skateboard`,
					keywords: [
						`skate`,
						`trick`,
						`ride`,
						`ollie`
					]
				},
				{
					emoji: `🛼`,
					name: `roller_skate`,
					keywords: [
						`skate`,
						`retro`,
						`fun`,
						`disco`
					]
				},
				{
					emoji: `🚏`,
					name: `bus_stop`,
					keywords: [
						`vehicle`,
						`public_transport`,
						`ride`,
						`coach`
					]
				},
				{
					emoji: `🛣`,
					name: `motorway`,
					keywords: [
						`highway`,
						`road`,
						`fast`,
						`drive`
					]
				},
				{
					emoji: `🛤`,
					name: `railway_track`,
					keywords: [
						`train`,
						`rail`,
						`iron`,
						`track`
					]
				},
				{
					emoji: `🛢`,
					name: `oil_drum`,
					keywords: [
						`fuel`,
						`petroleum`,
						`barrel`,
						`gas`
					]
				},
				{
					emoji: `⛽`,
					name: `fuel_pump`,
					keywords: [
						`gas`,
						`station`,
						`petrol`,
						`fill`
					]
				},
				{
					emoji: `🛞`,
					name: `wheel`,
					keywords: [
						`tire`,
						`rotate`,
						`car`,
						`round`
					]
				},
				{
					emoji: `🚨`,
					name: `police_car_light`,
					keywords: [
						`emergency`,
						`siren`,
						`alert`,
						`flash`
					]
				},
				{
					emoji: `🚥`,
					name: `horizontal_traffic_light`,
					keywords: [
						`road`,
						`stop`,
						`go`,
						`signal`
					]
				},
				{
					emoji: `🚦`,
					name: `vertical_traffic_light`,
					keywords: [
						`road`,
						`stop`,
						`go`,
						`signal`
					]
				},
				{
					emoji: `🛑`,
					name: `stop_sign`,
					keywords: [
						`halt`,
						`red`,
						`traffic`,
						`wait`
					]
				},
				{
					emoji: `🚧`,
					name: `construction`,
					keywords: [
						`work`,
						`road`,
						`caution`,
						`build`
					]
				},
				{
					emoji: `⚓`,
					name: `anchor`,
					keywords: [
						`ship`,
						`dock`,
						`heavy`,
						`port`
					]
				},
				{
					emoji: `🛟`,
					name: `ring_buoy`,
					keywords: [
						`rescue`,
						`water`,
						`safety`,
						`float`
					]
				},
				{
					emoji: `⛵`,
					name: `sailboat`,
					keywords: [
						`wind`,
						`sea`,
						`sail`,
						`ocean`
					]
				},
				{
					emoji: `🛶`,
					name: `canoe`,
					keywords: [
						`paddle`,
						`river`,
						`kayak`,
						`water`
					]
				},
				{
					emoji: `🚤`,
					name: `speedboat`,
					keywords: [
						`fast`,
						`water`,
						`race`,
						`wave`
					]
				},
				{
					emoji: `🛳`,
					name: `passenger_ship`,
					keywords: [
						`boat`,
						`vessel`,
						`ocean`,
						`sail`
					]
				},
				{
					emoji: `⛴️`,
					name: `ferry`,
					keywords: [
						`boat`,
						`cross`,
						`water`,
						`transport`
					]
				},
				{
					emoji: `🛥`,
					name: `motor_boat`,
					keywords: [
						`speed`,
						`water`,
						`lake`,
						`cruise`
					]
				},
				{
					emoji: `🚢`,
					name: `ship`,
					keywords: [
						`boat`,
						`vessel`,
						`ocean`,
						`sail`
					]
				},
				{
					emoji: `✈️`,
					name: `airplane`,
					keywords: [
						`flight`,
						`travel`,
						`jet`,
						`plane`
					]
				},
				{
					emoji: `🛩`,
					name: `small_airplane`,
					keywords: [
						`flight`,
						`travel`,
						`jet`,
						`plane`
					]
				},
				{
					emoji: `🛫`,
					name: `airplane_departure`,
					keywords: [
						`flight`,
						`travel`,
						`jet`,
						`plane`
					]
				},
				{
					emoji: `🛬`,
					name: `airplane_arrival`,
					keywords: [
						`flight`,
						`travel`,
						`jet`,
						`plane`
					]
				},
				{
					emoji: `🪂`,
					name: `parachute`,
					keywords: [
						`sky`,
						`jump`,
						`fall`,
						`land`
					]
				},
				{
					emoji: `💺`,
					name: `seat`,
					keywords: [
						`sit`,
						`chair`,
						`plane`,
						`theater`
					]
				},
				{
					emoji: `🚁`,
					name: `helicopter`,
					keywords: [
						`fly`,
						`hover`,
						`rescue`,
						`chopper`
					]
				},
				{
					emoji: `🚟`,
					name: `suspension_railway`,
					keywords: [
						`hang`,
						`train`,
						`urban`,
						`modern`
					]
				},
				{
					emoji: `🚠`,
					name: `mountain_cableway`,
					keywords: [
						`gondola`,
						`ski`,
						`scenic`,
						`lift`
					]
				},
				{
					emoji: `🚡`,
					name: `aerial_tramway`,
					keywords: [
						`cable_car`,
						`mountain`,
						`ride`,
						`view`
					]
				},
				{
					emoji: `🛰`,
					name: `satellite`,
					keywords: [
						`space`,
						`orbit`,
						`gps`,
						`signal`
					]
				},
				{
					emoji: `🚀`,
					name: `rocket`,
					keywords: [
						`space`,
						`launch`,
						`spaceship`,
						`missile`
					]
				},
				{
					emoji: `🛸`,
					name: `flying_saucer`,
					keywords: [
						`ufo`,
						`alien`,
						`space`,
						`sci_fi`
					]
				},
				{
					emoji: `🛎`,
					name: `bellhop_bell`,
					keywords: [
						`hotel`,
						`service`,
						`ring`,
						`reception`
					]
				},
				{
					emoji: `🧳`,
					name: `luggage`,
					keywords: [
						`travel`,
						`suitcase`,
						`pack`,
						`trip`
					]
				},
				{
					emoji: `⌛`,
					name: `hourglass_done`,
					keywords: [
						`time`,
						`wait`,
						`sand`,
						`complete`
					]
				},
				{
					emoji: `⏳`,
					name: `hourglass_not_done`,
					keywords: [
						`time`,
						`wait`,
						`sand`,
						`running`
					]
				},
				{
					emoji: `⌚`,
					name: `watch`,
					keywords: [
						`time`,
						`wrist`,
						`clock`,
						`hour`
					]
				},
				{
					emoji: `⏰`,
					name: `alarm_clock`,
					keywords: [
						`wake`,
						`morning`,
						`time`,
						`ring`
					]
				},
				{
					emoji: `⏱️`,
					name: `stopwatch`,
					keywords: [
						`timer`,
						`race`,
						`speed`,
						`measure`
					]
				},
				{
					emoji: `⏲️`,
					name: `timer_clock`,
					keywords: [
						`countdown`,
						`cooking`,
						`alarm`,
						`set`
					]
				},
				{
					emoji: `🕰`,
					name: `mantelpiece_clock`,
					keywords: [
						`time`,
						`vintage`,
						`antique`,
						`decor`
					]
				},
				{
					emoji: `🕛`,
					name: `twelve_o_clock`,
					keywords: [`twelve`, `clock`]
				},
				{
					emoji: `🕧`,
					name: `twelve_thirty`,
					keywords: [`twelve`, `thirty`]
				},
				{
					emoji: `🕐`,
					name: `one_o_clock`,
					keywords: [`one`, `clock`]
				},
				{
					emoji: `🕜`,
					name: `one_thirty`,
					keywords: [`one`, `thirty`]
				},
				{
					emoji: `🕑`,
					name: `two_o_clock`,
					keywords: [`two`, `clock`]
				},
				{
					emoji: `🕝`,
					name: `two_thirty`,
					keywords: [`two`, `thirty`]
				},
				{
					emoji: `🕒`,
					name: `three_o_clock`,
					keywords: [`three`, `clock`]
				},
				{
					emoji: `🕞`,
					name: `three_thirty`,
					keywords: [`three`, `thirty`]
				},
				{
					emoji: `🕓`,
					name: `four_o_clock`,
					keywords: [`four`, `clock`]
				},
				{
					emoji: `🕟`,
					name: `four_thirty`,
					keywords: [`four`, `thirty`]
				},
				{
					emoji: `🕔`,
					name: `five_o_clock`,
					keywords: [`five`, `clock`]
				},
				{
					emoji: `🕠`,
					name: `five_thirty`,
					keywords: [`five`, `thirty`]
				},
				{
					emoji: `🕕`,
					name: `six_o_clock`,
					keywords: [`six`, `clock`]
				},
				{
					emoji: `🕡`,
					name: `six_thirty`,
					keywords: [`six`, `thirty`]
				},
				{
					emoji: `🕖`,
					name: `seven_o_clock`,
					keywords: [`seven`, `clock`]
				},
				{
					emoji: `🕢`,
					name: `seven_thirty`,
					keywords: [`seven`, `thirty`]
				},
				{
					emoji: `🕗`,
					name: `eight_o_clock`,
					keywords: [`eight`, `clock`]
				},
				{
					emoji: `🕣`,
					name: `eight_thirty`,
					keywords: [`eight`, `thirty`]
				},
				{
					emoji: `🕘`,
					name: `nine_o_clock`,
					keywords: [`nine`, `clock`]
				},
				{
					emoji: `🕤`,
					name: `nine_thirty`,
					keywords: [`nine`, `thirty`]
				},
				{
					emoji: `🕙`,
					name: `ten_o_clock`,
					keywords: [`ten`, `clock`]
				},
				{
					emoji: `🕥`,
					name: `ten_thirty`,
					keywords: [`ten`, `thirty`]
				},
				{
					emoji: `🕚`,
					name: `eleven_o_clock`,
					keywords: [`eleven`, `clock`]
				},
				{
					emoji: `🕦`,
					name: `eleven_thirty`,
					keywords: [`eleven`, `thirty`]
				},
				{
					emoji: `🌑`,
					name: `new_moon`,
					keywords: [
						`night`,
						`dark`,
						`lunar`,
						`phase`
					]
				},
				{
					emoji: `🌒`,
					name: `waxing_crescent_moon`,
					keywords: [
						`waxing`,
						`crescent`,
						`moon`
					]
				},
				{
					emoji: `🌓`,
					name: `first_quarter_moon`,
					keywords: [
						`first`,
						`quarter`,
						`moon`
					]
				},
				{
					emoji: `🌔`,
					name: `waxing_gibbous_moon`,
					keywords: [
						`waxing`,
						`gibbous`,
						`moon`
					]
				},
				{
					emoji: `🌕`,
					name: `full_moon`,
					keywords: [
						`night`,
						`bright`,
						`lunar`,
						`werewolf`
					]
				},
				{
					emoji: `🌖`,
					name: `waning_gibbous_moon`,
					keywords: [
						`waning`,
						`gibbous`,
						`moon`
					]
				},
				{
					emoji: `🌗`,
					name: `last_quarter_moon`,
					keywords: [
						`last`,
						`quarter`,
						`moon`
					]
				},
				{
					emoji: `🌘`,
					name: `waning_crescent_moon`,
					keywords: [
						`waning`,
						`crescent`,
						`moon`
					]
				},
				{
					emoji: `🌙`,
					name: `crescent_moon`,
					keywords: [
						`night`,
						`sleep`,
						`dark`,
						`sky`
					]
				},
				{
					emoji: `🌚`,
					name: `new_moon_face`,
					keywords: [
						`new`,
						`moon`,
						`face`
					]
				},
				{
					emoji: `🌛`,
					name: `first_quarter_moon_face`,
					keywords: [
						`first`,
						`quarter`,
						`moon`,
						`face`
					]
				},
				{
					emoji: `🌜`,
					name: `last_quarter_moon_face`,
					keywords: [
						`last`,
						`quarter`,
						`moon`,
						`face`
					]
				},
				{
					emoji: `🌡`,
					name: `thermometer`,
					keywords: [
						`fever`,
						`temperature`,
						`hot`,
						`cold`
					]
				},
				{
					emoji: `☀️`,
					name: `sun`,
					keywords: [
						`bright`,
						`warm`,
						`day`,
						`summer`,
						`shine`
					]
				},
				{
					emoji: `🌝`,
					name: `full_moon_face`,
					keywords: [
						`full`,
						`moon`,
						`face`
					]
				},
				{
					emoji: `🌞`,
					name: `sun_with_face`,
					keywords: [`sun`, `face`]
				},
				{
					emoji: `🪐`,
					name: `ringed_planet`,
					keywords: [
						`saturn`,
						`space`,
						`astronomy`,
						`solar`
					]
				},
				{
					emoji: `⭐`,
					name: `star`,
					keywords: [
						`star`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `🌟`,
					name: `glowing_star`,
					keywords: [
						`glowing`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `🌠`,
					name: `shooting_star`,
					keywords: [
						`shooting`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `🌌`,
					name: `milky_way`,
					keywords: [
						`galaxy`,
						`space`,
						`stars`,
						`night`
					]
				},
				{
					emoji: `☁️`,
					name: `cloud`,
					keywords: [
						`weather`,
						`sky`,
						`overcast`,
						`fluffy`
					]
				},
				{
					emoji: `⛅`,
					name: `sun_behind_cloud`,
					keywords: [
						`sun`,
						`behind`,
						`cloud`
					]
				},
				{
					emoji: `⛈️`,
					name: `cloud_with_lightning_and_rain`,
					keywords: [
						`cloud`,
						`lightning`,
						`rain`
					]
				},
				{
					emoji: `🌤`,
					name: `sun_behind_small_cloud`,
					keywords: [
						`sun`,
						`behind`,
						`small`,
						`cloud`
					]
				},
				{
					emoji: `🌥`,
					name: `sun_behind_large_cloud`,
					keywords: [
						`sun`,
						`behind`,
						`large`,
						`cloud`
					]
				},
				{
					emoji: `🌦`,
					name: `sun_behind_rain_cloud`,
					keywords: [
						`sun`,
						`behind`,
						`rain`,
						`cloud`
					]
				},
				{
					emoji: `🌧`,
					name: `cloud_with_rain`,
					keywords: [`cloud`, `rain`]
				},
				{
					emoji: `🌨`,
					name: `cloud_with_snow`,
					keywords: [`cloud`, `snow`]
				},
				{
					emoji: `🌩`,
					name: `cloud_with_lightning`,
					keywords: [`cloud`, `lightning`]
				},
				{
					emoji: `🌪`,
					name: `tornado`,
					keywords: [
						`storm`,
						`destroy`,
						`disaster`,
						`wind`
					]
				},
				{
					emoji: `🌫`,
					name: `fog`,
					keywords: [
						`mist`,
						`haze`,
						`visibility`,
						`morning`
					]
				},
				{
					emoji: `🌬`,
					name: `wind_face`,
					keywords: [
						`blow`,
						`breeze`,
						`gust`,
						`air`
					]
				},
				{
					emoji: `🌀`,
					name: `cyclone`,
					keywords: [
						`hurricane`,
						`typhoon`,
						`storm`,
						`spin`
					]
				},
				{
					emoji: `🌈`,
					name: `rainbow`,
					keywords: [
						`colorful`,
						`lucky`,
						`rain`,
						`beautiful`
					]
				},
				{
					emoji: `🌂`,
					name: `closed_umbrella`,
					keywords: [
						`rain`,
						`weather`,
						`fold`,
						`dry`
					]
				},
				{
					emoji: `☂️`,
					name: `umbrella`,
					keywords: [
						`rain`,
						`protect`,
						`weather`,
						`wet`
					]
				},
				{
					emoji: `☔`,
					name: `umbrella_with_rain_drops`,
					keywords: [
						`umbrella`,
						`rain`,
						`drops`
					]
				},
				{
					emoji: `⛱️`,
					name: `umbrella_on_ground`,
					keywords: [`umbrella`, `ground`]
				},
				{
					emoji: `⚡`,
					name: `high_voltage`,
					keywords: [
						`electric`,
						`shock`,
						`power`,
						`lightning`
					]
				},
				{
					emoji: `❄️`,
					name: `snowflake`,
					keywords: [
						`winter`,
						`cold`,
						`ice`,
						`frozen`
					]
				},
				{
					emoji: `☃️`,
					name: `snowman`,
					keywords: [
						`winter`,
						`cold`,
						`snow`,
						`frosty`
					]
				},
				{
					emoji: `⛄`,
					name: `snowman_without_snow`,
					keywords: [
						`snowman`,
						`without`,
						`snow`
					]
				},
				{
					emoji: `☄️`,
					name: `comet`,
					keywords: [
						`space`,
						`tail`,
						`shooting`,
						`astronomy`
					]
				},
				{
					emoji: `🔥`,
					name: `fire`,
					keywords: [
						`hot`,
						`flame`,
						`lit`,
						`burn`
					]
				},
				{
					emoji: `💧`,
					name: `droplet`,
					keywords: [
						`water`,
						`rain`,
						`tear`,
						`drip`
					]
				},
				{
					emoji: `🌊`,
					name: `water_wave`,
					keywords: [
						`ocean`,
						`surf`,
						`beach`,
						`tsunami`
					]
				}
			]
		},
		{
			id: `activities`,
			key: `activities`,
			icon: `⚽`,
			items: [
				{
					emoji: `🎃`,
					name: `jack_o_lantern`,
					keywords: [
						`halloween`,
						`pumpkin`,
						`spooky`,
						`october`
					]
				},
				{
					emoji: `🎄`,
					name: `christmas_tree`,
					keywords: [
						`holiday`,
						`december`,
						`decorate`,
						`santa`
					]
				},
				{
					emoji: `🎆`,
					name: `fireworks`,
					keywords: [
						`celebrate`,
						`new_year`,
						`festival`,
						`boom`
					]
				},
				{
					emoji: `🎇`,
					name: `sparkler`,
					keywords: [
						`celebrate`,
						`light`,
						`party`,
						`spark`
					]
				},
				{
					emoji: `🧨`,
					name: `firecracker`,
					keywords: [
						`loud`,
						`bang`,
						`chinese`,
						`new_year`
					]
				},
				{
					emoji: `✨`,
					name: `sparkles`,
					keywords: [
						`shine`,
						`magic`,
						`clean`,
						`new`,
						`glitter`
					]
				},
				{
					emoji: `🎈`,
					name: `balloon`,
					keywords: [
						`party`,
						`birthday`,
						`float`,
						`colorful`
					]
				},
				{
					emoji: `🎉`,
					name: `party_popper`,
					keywords: [
						`celebrate`,
						`birthday`,
						`congrats`,
						`hooray`
					]
				},
				{
					emoji: `🎊`,
					name: `confetti_ball`,
					keywords: [
						`celebrate`,
						`party`,
						`colorful`,
						`festive`
					]
				},
				{
					emoji: `🎋`,
					name: `tanabata_tree`,
					keywords: [
						`japanese`,
						`wish`,
						`festival`,
						`star`
					]
				},
				{
					emoji: `🎍`,
					name: `pine_decoration`,
					keywords: [
						`japanese`,
						`new_year`,
						`bamboo`,
						`traditional`
					]
				},
				{
					emoji: `🎎`,
					name: `japanese_dolls`,
					keywords: [
						`hinamatsuri`,
						`girls_day`,
						`traditional`,
						`festival`
					]
				},
				{
					emoji: `🎏`,
					name: `carp_streamer`,
					keywords: [
						`japanese`,
						`boys_day`,
						`koinobori`,
						`festival`
					]
				},
				{
					emoji: `🎐`,
					name: `wind_chime`,
					keywords: [
						`japanese`,
						`summer`,
						`breeze`,
						`bell`
					]
				},
				{
					emoji: `🎑`,
					name: `moon_viewing_ceremony`,
					keywords: [
						`japanese`,
						`autumn`,
						`tsukimi`,
						`harvest`
					]
				},
				{
					emoji: `🧧`,
					name: `red_envelope`,
					keywords: [
						`chinese`,
						`lucky`,
						`money`,
						`new_year`
					]
				},
				{
					emoji: `🎀`,
					name: `ribbon`,
					keywords: [
						`gift`,
						`bow`,
						`decoration`,
						`pretty`
					]
				},
				{
					emoji: `🎁`,
					name: `wrapped_gift`,
					keywords: [
						`present`,
						`birthday`,
						`surprise`,
						`give`
					]
				},
				{
					emoji: `🎗`,
					name: `reminder_ribbon`,
					keywords: [
						`awareness`,
						`cause`,
						`support`,
						`charity`
					]
				},
				{
					emoji: `🎟`,
					name: `admission_tickets`,
					keywords: [
						`movie`,
						`concert`,
						`event`,
						`enter`
					]
				},
				{
					emoji: `🎫`,
					name: `ticket`,
					keywords: [
						`event`,
						`movie`,
						`enter`,
						`pass`
					]
				},
				{
					emoji: `🎖`,
					name: `military_medal`,
					keywords: [
						`honor`,
						`brave`,
						`award`,
						`service`
					]
				},
				{
					emoji: `🏆`,
					name: `trophy`,
					keywords: [
						`winner`,
						`champion`,
						`award`,
						`first_place`
					]
				},
				{
					emoji: `🏅`,
					name: `sports_medal`,
					keywords: [
						`award`,
						`winner`,
						`compete`,
						`gold`
					]
				},
				{
					emoji: `🥇`,
					name: `1st_place_medal`,
					keywords: [
						`gold`,
						`winner`,
						`champion`,
						`best`
					]
				},
				{
					emoji: `🥈`,
					name: `2nd_place_medal`,
					keywords: [
						`silver`,
						`runner_up`,
						`compete`,
						`good`
					]
				},
				{
					emoji: `🥉`,
					name: `3rd_place_medal`,
					keywords: [
						`bronze`,
						`third`,
						`compete`,
						`effort`
					]
				},
				{
					emoji: `⚽`,
					name: `soccer_ball`,
					keywords: [
						`football`,
						`sport`,
						`kick`,
						`goal`
					]
				},
				{
					emoji: `⚾`,
					name: `baseball`,
					keywords: [
						`sport`,
						`bat`,
						`pitch`,
						`america`
					]
				},
				{
					emoji: `🥎`,
					name: `softball`,
					keywords: [
						`sport`,
						`pitch`,
						`team`,
						`ball`
					]
				},
				{
					emoji: `🏀`,
					name: `basketball`,
					keywords: [
						`sport`,
						`hoop`,
						`dunk`,
						`nba`
					]
				},
				{
					emoji: `🏐`,
					name: `volleyball`,
					keywords: [
						`sport`,
						`beach`,
						`net`,
						`team`
					]
				},
				{
					emoji: `🏈`,
					name: `american_football`,
					keywords: [
						`sport`,
						`nfl`,
						`touchdown`,
						`super_bowl`
					]
				},
				{
					emoji: `🏉`,
					name: `rugby_football`,
					keywords: [
						`sport`,
						`tackle`,
						`scrum`,
						`try`
					]
				},
				{
					emoji: `🎾`,
					name: `tennis`,
					keywords: [
						`sport`,
						`racket`,
						`serve`,
						`court`
					]
				},
				{
					emoji: `🥏`,
					name: `flying_disc`,
					keywords: [
						`frisbee`,
						`throw`,
						`catch`,
						`outdoor`
					]
				},
				{
					emoji: `🎳`,
					name: `bowling`,
					keywords: [
						`sport`,
						`pins`,
						`strike`,
						`lane`
					]
				},
				{
					emoji: `🏏`,
					name: `cricket_game`,
					keywords: [
						`sport`,
						`bat`,
						`wicket`,
						`india`
					]
				},
				{
					emoji: `🏑`,
					name: `field_hockey`,
					keywords: [
						`sport`,
						`stick`,
						`turf`,
						`team`
					]
				},
				{
					emoji: `🏒`,
					name: `ice_hockey`,
					keywords: [
						`sport`,
						`puck`,
						`rink`,
						`cold`
					]
				},
				{
					emoji: `🥍`,
					name: `lacrosse`,
					keywords: [
						`sport`,
						`stick`,
						`native`,
						`team`
					]
				},
				{
					emoji: `🏓`,
					name: `ping_pong`,
					keywords: [
						`table_tennis`,
						`sport`,
						`paddle`,
						`ball`
					]
				},
				{
					emoji: `🏸`,
					name: `badminton`,
					keywords: [
						`sport`,
						`shuttlecock`,
						`racket`,
						`net`
					]
				},
				{
					emoji: `🥊`,
					name: `boxing_glove`,
					keywords: [
						`fight`,
						`punch`,
						`sport`,
						`ring`
					]
				},
				{
					emoji: `🥋`,
					name: `martial_arts_uniform`,
					keywords: [
						`karate`,
						`judo`,
						`taekwondo`,
						`sport`
					]
				},
				{
					emoji: `🥅`,
					name: `goal_net`,
					keywords: [
						`score`,
						`soccer`,
						`hockey`,
						`sport`
					]
				},
				{
					emoji: `⛳`,
					name: `flag_in_hole`,
					keywords: [
						`golf`,
						`sport`,
						`course`,
						`putt`
					]
				},
				{
					emoji: `⛸️`,
					name: `ice_skate`,
					keywords: [
						`winter`,
						`rink`,
						`sport`,
						`figure`
					]
				},
				{
					emoji: `🎣`,
					name: `fishing_pole`,
					keywords: [
						`catch`,
						`outdoor`,
						`lake`,
						`hobby`
					]
				},
				{
					emoji: `🤿`,
					name: `diving_mask`,
					keywords: [
						`swim`,
						`snorkel`,
						`underwater`,
						`ocean`
					]
				},
				{
					emoji: `🎽`,
					name: `running_shirt`,
					keywords: [
						`sport`,
						`exercise`,
						`marathon`,
						`race`
					]
				},
				{
					emoji: `🎿`,
					name: `skis`,
					keywords: [
						`winter`,
						`snow`,
						`mountain`,
						`sport`
					]
				},
				{
					emoji: `🛷`,
					name: `sled`,
					keywords: [
						`snow`,
						`winter`,
						`slide`,
						`downhill`
					]
				},
				{
					emoji: `🥌`,
					name: `curling_stone`,
					keywords: [
						`winter`,
						`ice`,
						`sport`,
						`olympic`
					]
				},
				{
					emoji: `🎯`,
					name: `bullseye`,
					keywords: [
						`target`,
						`aim`,
						`accurate`,
						`goal`
					]
				},
				{
					emoji: `🪀`,
					name: `yo_yo`,
					keywords: [
						`toy`,
						`spin`,
						`string`,
						`trick`
					]
				},
				{
					emoji: `🪁`,
					name: `kite`,
					keywords: [
						`fly`,
						`wind`,
						`outdoor`,
						`spring`
					]
				},
				{
					emoji: `🎱`,
					name: `pool_8_ball`,
					keywords: [
						`billiards`,
						`game`,
						`table`,
						`cue`
					]
				},
				{
					emoji: `🔮`,
					name: `crystal_ball`,
					keywords: [
						`fortune`,
						`magic`,
						`predict`,
						`mystic`
					]
				},
				{
					emoji: `🪄`,
					name: `magic_wand`,
					keywords: [
						`spell`,
						`wizard`,
						`fantasy`,
						`trick`
					]
				},
				{
					emoji: `🎮`,
					name: `video_game`,
					keywords: [
						`play`,
						`console`,
						`controller`,
						`fun`
					]
				},
				{
					emoji: `🕹`,
					name: `joystick`,
					keywords: [
						`game`,
						`arcade`,
						`retro`,
						`play`
					]
				},
				{
					emoji: `🎰`,
					name: `slot_machine`,
					keywords: [
						`casino`,
						`gamble`,
						`luck`,
						`jackpot`
					]
				},
				{
					emoji: `🎲`,
					name: `game_die`,
					keywords: [
						`dice`,
						`roll`,
						`chance`,
						`board_game`
					]
				},
				{
					emoji: `🧩`,
					name: `puzzle_piece`,
					keywords: [
						`jigsaw`,
						`solve`,
						`fit`,
						`think`
					]
				},
				{
					emoji: `🧸`,
					name: `teddy_bear`,
					keywords: [
						`toy`,
						`cute`,
						`plush`,
						`stuffed`
					]
				},
				{
					emoji: `🪅`,
					name: `pinata`,
					keywords: [
						`party`,
						`mexico`,
						`candy`,
						`smash`
					]
				},
				{
					emoji: `🪩`,
					name: `mirror_ball`,
					keywords: [
						`disco`,
						`dance`,
						`party`,
						`shiny`
					]
				},
				{
					emoji: `🪆`,
					name: `nesting_dolls`,
					keywords: [
						`russian`,
						`matryoshka`,
						`stack`,
						`wooden`
					]
				},
				{
					emoji: `♠️`,
					name: `spade_suit`,
					keywords: [
						`card`,
						`poker`,
						`game`,
						`black`
					]
				},
				{
					emoji: `♥️`,
					name: `heart_suit`,
					keywords: [
						`card`,
						`poker`,
						`game`,
						`red`
					]
				},
				{
					emoji: `♦️`,
					name: `diamond_suit`,
					keywords: [
						`card`,
						`poker`,
						`game`,
						`red`
					]
				},
				{
					emoji: `♣️`,
					name: `club_suit`,
					keywords: [
						`card`,
						`poker`,
						`game`,
						`black`
					]
				},
				{
					emoji: `♟️`,
					name: `chess_pawn`,
					keywords: [
						`strategy`,
						`board_game`,
						`move`,
						`piece`
					]
				},
				{
					emoji: `🃏`,
					name: `joker`,
					keywords: [
						`card`,
						`wild`,
						`clown`,
						`trick`
					]
				},
				{
					emoji: `🀄`,
					name: `mahjong_red_dragon`,
					keywords: [
						`chinese`,
						`game`,
						`tile`,
						`luck`
					]
				},
				{
					emoji: `🎴`,
					name: `flower_playing_cards`,
					keywords: [
						`japanese`,
						`hanafuda`,
						`game`,
						`card`
					]
				},
				{
					emoji: `🔫`,
					name: `water_pistol`,
					keywords: [
						`toy`,
						`squirt`,
						`fun`,
						`summer`
					]
				},
				{
					emoji: `🎭`,
					name: `performing_arts`,
					keywords: [
						`theater`,
						`drama`,
						`mask`,
						`stage`
					]
				},
				{
					emoji: `🖼`,
					name: `framed_picture`,
					keywords: [
						`art`,
						`photo`,
						`museum`,
						`gallery`
					]
				},
				{
					emoji: `🎨`,
					name: `artist_palette`,
					keywords: [
						`paint`,
						`creative`,
						`draw`,
						`art`
					]
				},
				{
					emoji: `🧵`,
					name: `thread`,
					keywords: [
						`sew`,
						`stitch`,
						`fabric`,
						`needle`
					]
				},
				{
					emoji: `🪡`,
					name: `sewing_needle`,
					keywords: [
						`stitch`,
						`repair`,
						`craft`,
						`thread`
					]
				},
				{
					emoji: `🧶`,
					name: `yarn`,
					keywords: [
						`knit`,
						`crochet`,
						`wool`,
						`craft`
					]
				},
				{
					emoji: `🪢`,
					name: `knot`,
					keywords: [
						`tie`,
						`rope`,
						`secure`,
						`loop`
					]
				}
			]
		},
		{
			id: `objects`,
			key: `objects`,
			icon: `💡`,
			items: [
				{
					emoji: `👓`,
					name: `glasses`,
					keywords: [
						`eyewear`,
						`read`,
						`vision`,
						`nerd`
					]
				},
				{
					emoji: `🕶`,
					name: `sunglasses`,
					keywords: [
						`cool`,
						`shade`,
						`summer`,
						`fashion`
					]
				},
				{
					emoji: `🥽`,
					name: `goggles`,
					keywords: [
						`swim`,
						`ski`,
						`protect`,
						`lab`
					]
				},
				{
					emoji: `🥼`,
					name: `lab_coat`,
					keywords: [
						`science`,
						`doctor`,
						`research`,
						`white`
					]
				},
				{
					emoji: `🦺`,
					name: `safety_vest`,
					keywords: [
						`construction`,
						`visible`,
						`work`,
						`safety`
					]
				},
				{
					emoji: `👔`,
					name: `necktie`,
					keywords: [
						`formal`,
						`business`,
						`office`,
						`suit`
					]
				},
				{
					emoji: `👕`,
					name: `t_shirt`,
					keywords: [
						`casual`,
						`clothes`,
						`wear`,
						`fashion`
					]
				},
				{
					emoji: `👖`,
					name: `jeans`,
					keywords: [
						`pants`,
						`denim`,
						`casual`,
						`blue`
					]
				},
				{
					emoji: `🧣`,
					name: `scarf`,
					keywords: [
						`warm`,
						`winter`,
						`fashion`,
						`neck`
					]
				},
				{
					emoji: `🧤`,
					name: `gloves`,
					keywords: [
						`warm`,
						`winter`,
						`hands`,
						`protect`
					]
				},
				{
					emoji: `🧥`,
					name: `coat`,
					keywords: [
						`warm`,
						`winter`,
						`jacket`,
						`outer`
					]
				},
				{
					emoji: `🧦`,
					name: `socks`,
					keywords: [
						`feet`,
						`warm`,
						`pair`,
						`laundry`
					]
				},
				{
					emoji: `👗`,
					name: `dress`,
					keywords: [
						`fashion`,
						`formal`,
						`woman`,
						`pretty`
					]
				},
				{
					emoji: `👘`,
					name: `kimono`,
					keywords: [
						`japanese`,
						`traditional`,
						`robe`,
						`culture`
					]
				},
				{
					emoji: `🥻`,
					name: `sari`,
					keywords: [
						`indian`,
						`traditional`,
						`fabric`,
						`culture`
					]
				},
				{
					emoji: `🩱`,
					name: `one_piece_swimsuit`,
					keywords: [
						`swim`,
						`beach`,
						`pool`,
						`summer`
					]
				},
				{
					emoji: `🩲`,
					name: `briefs`,
					keywords: [
						`underwear`,
						`shorts`,
						`undergarment`,
						`clothing`
					]
				},
				{
					emoji: `🩳`,
					name: `shorts`,
					keywords: [
						`summer`,
						`casual`,
						`beach`,
						`exercise`
					]
				},
				{
					emoji: `👙`,
					name: `bikini`,
					keywords: [
						`swim`,
						`beach`,
						`summer`,
						`pool`
					]
				},
				{
					emoji: `👚`,
					name: `woman_s_clothes`,
					keywords: [
						`blouse`,
						`top`,
						`fashion`,
						`feminine`
					]
				},
				{
					emoji: `👛`,
					name: `purse`,
					keywords: [
						`money`,
						`wallet`,
						`coin`,
						`woman`
					]
				},
				{
					emoji: `👜`,
					name: `handbag`,
					keywords: [
						`fashion`,
						`carry`,
						`woman`,
						`luxury`
					]
				},
				{
					emoji: `👝`,
					name: `clutch_bag`,
					keywords: [
						`fashion`,
						`evening`,
						`small`,
						`formal`
					]
				},
				{
					emoji: `🛍`,
					name: `shopping_bags`,
					keywords: [
						`buy`,
						`mall`,
						`retail`,
						`spend`
					]
				},
				{
					emoji: `🎒`,
					name: `backpack`,
					keywords: [
						`school`,
						`travel`,
						`carry`,
						`hike`
					]
				},
				{
					emoji: `🩴`,
					name: `thong_sandal`,
					keywords: [
						`flip_flop`,
						`beach`,
						`summer`,
						`casual`
					]
				},
				{
					emoji: `👞`,
					name: `man_s_shoe`,
					keywords: [
						`formal`,
						`leather`,
						`oxford`,
						`dress`
					]
				},
				{
					emoji: `👟`,
					name: `running_shoe`,
					keywords: [
						`sneaker`,
						`exercise`,
						`sport`,
						`nike`
					]
				},
				{
					emoji: `🥾`,
					name: `hiking_boot`,
					keywords: [
						`outdoor`,
						`trail`,
						`mountain`,
						`walk`
					]
				},
				{
					emoji: `🥿`,
					name: `flat_shoe`,
					keywords: [
						`comfortable`,
						`ballet`,
						`casual`,
						`woman`
					]
				},
				{
					emoji: `👠`,
					name: `high_heeled_shoe`,
					keywords: [
						`fancy`,
						`party`,
						`woman`,
						`elegant`
					]
				},
				{
					emoji: `👡`,
					name: `woman_s_sandal`,
					keywords: [
						`summer`,
						`fashion`,
						`open_toe`,
						`beach`
					]
				},
				{
					emoji: `🩰`,
					name: `ballet_shoes`,
					keywords: [
						`dance`,
						`graceful`,
						`pink`,
						`perform`
					]
				},
				{
					emoji: `👢`,
					name: `woman_s_boot`,
					keywords: [
						`fashion`,
						`tall`,
						`winter`,
						`heel`
					]
				},
				{
					emoji: `👑`,
					name: `crown`,
					keywords: [
						`king`,
						`queen`,
						`royal`,
						`prince`
					]
				},
				{
					emoji: `👒`,
					name: `woman_s_hat`,
					keywords: [
						`sun`,
						`fashion`,
						`summer`,
						`garden`
					]
				},
				{
					emoji: `🎩`,
					name: `top_hat`,
					keywords: [
						`formal`,
						`magic`,
						`gentleman`,
						`fancy`
					]
				},
				{
					emoji: `🎓`,
					name: `graduation_cap`,
					keywords: [
						`school`,
						`degree`,
						`learn`,
						`ceremony`
					]
				},
				{
					emoji: `🧢`,
					name: `billed_cap`,
					keywords: [
						`baseball`,
						`casual`,
						`sport`,
						`hat`
					]
				},
				{
					emoji: `🪖`,
					name: `military_helmet`,
					keywords: [
						`army`,
						`soldier`,
						`protect`,
						`war`
					]
				},
				{
					emoji: `⛑️`,
					name: `rescue_worker_s_helmet`,
					keywords: [
						`safety`,
						`firefighter`,
						`protect`,
						`hard_hat`
					]
				},
				{
					emoji: `📿`,
					name: `prayer_beads`,
					keywords: [
						`religion`,
						`meditation`,
						`spiritual`,
						`rosary`
					]
				},
				{
					emoji: `💄`,
					name: `lipstick`,
					keywords: [
						`makeup`,
						`beauty`,
						`red`,
						`cosmetic`
					]
				},
				{
					emoji: `💍`,
					name: `ring`,
					keywords: [
						`wedding`,
						`engaged`,
						`jewelry`,
						`diamond`
					]
				},
				{
					emoji: `💎`,
					name: `gem_stone`,
					keywords: [
						`diamond`,
						`jewel`,
						`precious`,
						`sparkle`
					]
				},
				{
					emoji: `🔇`,
					name: `muted_speaker`,
					keywords: [
						`silent`,
						`quiet`,
						`off`,
						`no_sound`
					]
				},
				{
					emoji: `🔈`,
					name: `speaker_low_volume`,
					keywords: [
						`speaker`,
						`low`,
						`volume`
					]
				},
				{
					emoji: `🔉`,
					name: `speaker_medium_volume`,
					keywords: [
						`speaker`,
						`medium`,
						`volume`
					]
				},
				{
					emoji: `🔊`,
					name: `speaker_high_volume`,
					keywords: [
						`speaker`,
						`high`,
						`volume`
					]
				},
				{
					emoji: `📢`,
					name: `loudspeaker`,
					keywords: [
						`announce`,
						`loud`,
						`broadcast`,
						`alert`
					]
				},
				{
					emoji: `📣`,
					name: `megaphone`,
					keywords: [
						`shout`,
						`announce`,
						`cheer`,
						`protest`
					]
				},
				{
					emoji: `📯`,
					name: `postal_horn`,
					keywords: [
						`mail`,
						`announce`,
						`old`,
						`brass`
					]
				},
				{
					emoji: `🔔`,
					name: `bell`,
					keywords: [
						`notification`,
						`ring`,
						`alert`,
						`alarm`
					]
				},
				{
					emoji: `🔕`,
					name: `bell_with_slash`,
					keywords: [
						`notification`,
						`alert`,
						`ring`,
						`alarm`
					]
				},
				{
					emoji: `🎼`,
					name: `musical_score`,
					keywords: [
						`sheet`,
						`notes`,
						`compose`,
						`melody`
					]
				},
				{
					emoji: `🎵`,
					name: `musical_note`,
					keywords: [
						`music`,
						`song`,
						`melody`,
						`tune`
					]
				},
				{
					emoji: `🎶`,
					name: `musical_notes`,
					keywords: [
						`music`,
						`song`,
						`melody`,
						`harmony`
					]
				},
				{
					emoji: `🎙`,
					name: `studio_microphone`,
					keywords: [
						`record`,
						`podcast`,
						`radio`,
						`voice`
					]
				},
				{
					emoji: `🎚`,
					name: `level_slider`,
					keywords: [
						`adjust`,
						`volume`,
						`control`,
						`mix`
					]
				},
				{
					emoji: `🎛`,
					name: `control_knobs`,
					keywords: [
						`adjust`,
						`settings`,
						`audio`,
						`mix`
					]
				},
				{
					emoji: `🎤`,
					name: `microphone`,
					keywords: [
						`sing`,
						`karaoke`,
						`speak`,
						`perform`
					]
				},
				{
					emoji: `🎧`,
					name: `headphone`,
					keywords: [
						`music`,
						`listen`,
						`audio`,
						`dj`
					]
				},
				{
					emoji: `📻`,
					name: `radio`,
					keywords: [
						`fm`,
						`music`,
						`broadcast`,
						`retro`
					]
				},
				{
					emoji: `🎷`,
					name: `saxophone`,
					keywords: [
						`jazz`,
						`music`,
						`blow`,
						`smooth`
					]
				},
				{
					emoji: `🪗`,
					name: `accordion`,
					keywords: [
						`music`,
						`squeeze`,
						`folk`,
						`polka`
					]
				},
				{
					emoji: `🎸`,
					name: `guitar`,
					keywords: [
						`music`,
						`rock`,
						`play`,
						`string`
					]
				},
				{
					emoji: `🎹`,
					name: `musical_keyboard`,
					keywords: [
						`piano`,
						`music`,
						`keys`,
						`play`
					]
				},
				{
					emoji: `🎺`,
					name: `trumpet`,
					keywords: [
						`music`,
						`jazz`,
						`brass`,
						`play`
					]
				},
				{
					emoji: `🎻`,
					name: `violin`,
					keywords: [
						`music`,
						`classical`,
						`string`,
						`orchestra`
					]
				},
				{
					emoji: `🪕`,
					name: `banjo`,
					keywords: [
						`country`,
						`folk`,
						`string`,
						`bluegrass`
					]
				},
				{
					emoji: `🥁`,
					name: `drum`,
					keywords: [
						`music`,
						`beat`,
						`rhythm`,
						`percussion`
					]
				},
				{
					emoji: `🪘`,
					name: `long_drum`,
					keywords: [
						`percussion`,
						`beat`,
						`african`,
						`rhythm`
					]
				},
				{
					emoji: `📱`,
					name: `mobile_phone`,
					keywords: [
						`call`,
						`text`,
						`smartphone`,
						`device`
					]
				},
				{
					emoji: `📲`,
					name: `mobile_phone_with_arrow`,
					keywords: [`call`, `cell`]
				},
				{
					emoji: `☎️`,
					name: `telephone`,
					keywords: [
						`call`,
						`ring`,
						`vintage`,
						`landline`
					]
				},
				{
					emoji: `📞`,
					name: `telephone_receiver`,
					keywords: [
						`call`,
						`answer`,
						`hold`,
						`talk`
					]
				},
				{
					emoji: `📟`,
					name: `pager`,
					keywords: [
						`beep`,
						`message`,
						`retro`,
						`90s`
					]
				},
				{
					emoji: `📠`,
					name: `fax_machine`,
					keywords: [
						`print`,
						`send`,
						`office`,
						`document`
					]
				},
				{
					emoji: `🔋`,
					name: `battery`,
					keywords: [
						`power`,
						`charge`,
						`energy`,
						`full`
					]
				},
				{
					emoji: `🪫`,
					name: `low_battery`,
					keywords: [
						`dead`,
						`charge`,
						`empty`,
						`dying`
					]
				},
				{
					emoji: `🔌`,
					name: `electric_plug`,
					keywords: [
						`power`,
						`connect`,
						`charge`,
						`outlet`
					]
				},
				{
					emoji: `💻`,
					name: `laptop`,
					keywords: [`laptop`]
				},
				{
					emoji: `🖥`,
					name: `desktop_computer`,
					keywords: [
						`monitor`,
						`screen`,
						`work`,
						`pc`
					]
				},
				{
					emoji: `🖨`,
					name: `printer`,
					keywords: [
						`print`,
						`paper`,
						`document`,
						`office`
					]
				},
				{
					emoji: `⌨️`,
					name: `keyboard`,
					keywords: [
						`type`,
						`computer`,
						`input`,
						`keys`
					]
				},
				{
					emoji: `🖱`,
					name: `computer_mouse`,
					keywords: [
						`click`,
						`point`,
						`scroll`,
						`cursor`
					]
				},
				{
					emoji: `🖲`,
					name: `trackball`,
					keywords: [
						`control`,
						`ball`,
						`input`,
						`pointer`
					]
				},
				{
					emoji: `💽`,
					name: `computer_disk`,
					keywords: [
						`save`,
						`storage`,
						`data`,
						`floppy`
					]
				},
				{
					emoji: `💾`,
					name: `floppy_disk`,
					keywords: [
						`save`,
						`retro`,
						`storage`,
						`90s`
					]
				},
				{
					emoji: `💿`,
					name: `optical_disk`,
					keywords: [
						`cd`,
						`dvd`,
						`burn`,
						`disc`
					]
				},
				{
					emoji: `📀`,
					name: `dvd`,
					keywords: [
						`movie`,
						`disc`,
						`video`,
						`burn`
					]
				},
				{
					emoji: `🧮`,
					name: `abacus`,
					keywords: [
						`count`,
						`math`,
						`ancient`,
						`calculate`
					]
				},
				{
					emoji: `🎥`,
					name: `movie_camera`,
					keywords: [
						`film`,
						`record`,
						`cinema`,
						`director`
					]
				},
				{
					emoji: `🎞`,
					name: `film_frames`,
					keywords: [
						`movie`,
						`cinema`,
						`reel`,
						`strip`
					]
				},
				{
					emoji: `📽`,
					name: `film_projector`,
					keywords: [
						`movie`,
						`cinema`,
						`screen`,
						`old`
					]
				},
				{
					emoji: `🎬`,
					name: `clapper_board`,
					keywords: [
						`movie`,
						`action`,
						`scene`,
						`film`
					]
				},
				{
					emoji: `📺`,
					name: `television`,
					keywords: [
						`tv`,
						`watch`,
						`show`,
						`screen`
					]
				},
				{
					emoji: `📷`,
					name: `camera`,
					keywords: [
						`photo`,
						`picture`,
						`snap`,
						`shoot`
					]
				},
				{
					emoji: `📸`,
					name: `camera_with_flash`,
					keywords: [
						`photo`,
						`bright`,
						`snap`,
						`selfie`
					]
				},
				{
					emoji: `📹`,
					name: `video_camera`,
					keywords: [
						`film`,
						`record`,
						`shoot`,
						`tape`
					]
				},
				{
					emoji: `📼`,
					name: `videocassette`,
					keywords: [
						`vhs`,
						`tape`,
						`retro`,
						`record`
					]
				},
				{
					emoji: `🔍`,
					name: `magnifying_glass_tilted_left`,
					keywords: [
						`search`,
						`find`,
						`look`,
						`zoom`
					]
				},
				{
					emoji: `🔎`,
					name: `magnifying_glass_tilted_right`,
					keywords: [
						`search`,
						`find`,
						`look`,
						`inspect`
					]
				},
				{
					emoji: `🕯`,
					name: `candle`,
					keywords: [
						`light`,
						`flame`,
						`romantic`,
						`dark`
					]
				},
				{
					emoji: `💡`,
					name: `light_bulb`,
					keywords: [
						`idea`,
						`bright`,
						`think`,
						`innovation`
					]
				},
				{
					emoji: `🔦`,
					name: `flashlight`,
					keywords: [
						`light`,
						`dark`,
						`search`,
						`night`
					]
				},
				{
					emoji: `🏮`,
					name: `red_paper_lantern`,
					keywords: [
						`japanese`,
						`festival`,
						`light`,
						`night`
					]
				},
				{
					emoji: `🪔`,
					name: `diya_lamp`,
					keywords: [
						`indian`,
						`diwali`,
						`light`,
						`oil`
					]
				},
				{
					emoji: `📔`,
					name: `notebook_with_decorative_cover`,
					keywords: [
						`journal`,
						`diary`,
						`write`,
						`pretty`
					]
				},
				{
					emoji: `📕`,
					name: `closed_book`,
					keywords: [
						`read`,
						`study`,
						`literature`,
						`cover`
					]
				},
				{
					emoji: `📖`,
					name: `open_book`,
					keywords: [
						`read`,
						`study`,
						`page`,
						`knowledge`
					]
				},
				{
					emoji: `📗`,
					name: `green_book`,
					keywords: [
						`read`,
						`education`,
						`study`,
						`book`
					]
				},
				{
					emoji: `📘`,
					name: `blue_book`,
					keywords: [
						`read`,
						`education`,
						`study`,
						`book`
					]
				},
				{
					emoji: `📙`,
					name: `orange_book`,
					keywords: [
						`read`,
						`education`,
						`study`,
						`book`
					]
				},
				{
					emoji: `📚`,
					name: `books`,
					keywords: [
						`library`,
						`study`,
						`read`,
						`knowledge`
					]
				},
				{
					emoji: `📓`,
					name: `notebook`,
					keywords: [
						`write`,
						`note`,
						`journal`,
						`study`
					]
				},
				{
					emoji: `📒`,
					name: `ledger`,
					keywords: [
						`account`,
						`finance`,
						`record`,
						`book`
					]
				},
				{
					emoji: `📃`,
					name: `page_with_curl`,
					keywords: [
						`document`,
						`text`,
						`file`,
						`scroll`
					]
				},
				{
					emoji: `📜`,
					name: `scroll`,
					keywords: [
						`ancient`,
						`document`,
						`paper`,
						`old`
					]
				},
				{
					emoji: `📄`,
					name: `page_facing_up`,
					keywords: [
						`document`,
						`file`,
						`text`,
						`page`
					]
				},
				{
					emoji: `📰`,
					name: `newspaper`,
					keywords: [
						`news`,
						`read`,
						`press`,
						`article`
					]
				},
				{
					emoji: `🗞`,
					name: `rolled_up_newspaper`,
					keywords: [
						`news`,
						`read`,
						`press`,
						`morning`
					]
				},
				{
					emoji: `📑`,
					name: `bookmark_tabs`,
					keywords: [
						`mark`,
						`save`,
						`tabs`,
						`organize`
					]
				},
				{
					emoji: `🔖`,
					name: `bookmark`,
					keywords: [
						`save`,
						`mark`,
						`read`,
						`page`
					]
				},
				{
					emoji: `🏷`,
					name: `label`,
					keywords: [
						`tag`,
						`price`,
						`name`,
						`identify`
					]
				},
				{
					emoji: `💰`,
					name: `money_bag`,
					keywords: [
						`rich`,
						`cash`,
						`dollar`,
						`wealth`
					]
				},
				{
					emoji: `🪙`,
					name: `coin`,
					keywords: [
						`money`,
						`change`,
						`flip`,
						`metal`
					]
				},
				{
					emoji: `💴`,
					name: `yen_banknote`,
					keywords: [
						`money`,
						`japan`,
						`cash`,
						`currency`
					]
				},
				{
					emoji: `💵`,
					name: `dollar_banknote`,
					keywords: [
						`money`,
						`usa`,
						`cash`,
						`pay`
					]
				},
				{
					emoji: `💶`,
					name: `euro_banknote`,
					keywords: [
						`money`,
						`europe`,
						`cash`,
						`currency`
					]
				},
				{
					emoji: `💷`,
					name: `pound_banknote`,
					keywords: [
						`money`,
						`uk`,
						`cash`,
						`currency`
					]
				},
				{
					emoji: `💸`,
					name: `money_with_wings`,
					keywords: [
						`spend`,
						`waste`,
						`expensive`,
						`gone`
					]
				},
				{
					emoji: `💳`,
					name: `credit_card`,
					keywords: [
						`pay`,
						`swipe`,
						`bank`,
						`purchase`
					]
				},
				{
					emoji: `🧾`,
					name: `receipt`,
					keywords: [
						`bill`,
						`pay`,
						`purchase`,
						`record`
					]
				},
				{
					emoji: `💹`,
					name: `chart_increasing_with_yen`,
					keywords: [
						`japan`,
						`growth`,
						`profit`,
						`economy`
					]
				},
				{
					emoji: `✉️`,
					name: `envelope`,
					keywords: [
						`mail`,
						`letter`,
						`send`,
						`message`
					]
				},
				{
					emoji: `📧`,
					name: `e_mail`,
					keywords: [
						`email`,
						`send`,
						`digital`,
						`inbox`
					]
				},
				{
					emoji: `📨`,
					name: `incoming_envelope`,
					keywords: [
						`receive`,
						`mail`,
						`letter`,
						`new`
					]
				},
				{
					emoji: `📩`,
					name: `envelope_with_arrow`,
					keywords: [
						`send`,
						`mail`,
						`outbox`,
						`deliver`
					]
				},
				{
					emoji: `📤`,
					name: `outbox_tray`,
					keywords: [
						`send`,
						`outgoing`,
						`mail`,
						`upload`
					]
				},
				{
					emoji: `📥`,
					name: `inbox_tray`,
					keywords: [
						`receive`,
						`incoming`,
						`mail`,
						`download`
					]
				},
				{
					emoji: `📦`,
					name: `package`,
					keywords: [
						`box`,
						`deliver`,
						`ship`,
						`wrap`
					]
				},
				{
					emoji: `📫`,
					name: `closed_mailbox_with_raised_flag`,
					keywords: [
						`mail`,
						`new`,
						`letter`,
						`receive`
					]
				},
				{
					emoji: `📪`,
					name: `closed_mailbox_with_lowered_flag`,
					keywords: [
						`mail`,
						`empty`,
						`no_mail`,
						`box`
					]
				},
				{
					emoji: `📬`,
					name: `open_mailbox_with_raised_flag`,
					keywords: [
						`mail`,
						`receive`,
						`letter`,
						`new`
					]
				},
				{
					emoji: `📭`,
					name: `open_mailbox_with_lowered_flag`,
					keywords: [
						`mail`,
						`empty`,
						`check`,
						`box`
					]
				},
				{
					emoji: `📮`,
					name: `postbox`,
					keywords: [
						`mail`,
						`send`,
						`letter`,
						`red`
					]
				},
				{
					emoji: `🗳`,
					name: `ballot_box_with_ballot`,
					keywords: [
						`vote`,
						`election`,
						`choice`,
						`democracy`
					]
				},
				{
					emoji: `✏️`,
					name: `pencil`,
					keywords: [
						`write`,
						`draw`,
						`edit`,
						`note`
					]
				},
				{
					emoji: `✒️`,
					name: `black_nib`,
					keywords: [
						`write`,
						`pen`,
						`sign`,
						`calligraphy`
					]
				},
				{
					emoji: `🖋`,
					name: `fountain_pen`,
					keywords: [
						`write`,
						`sign`,
						`elegant`,
						`ink`
					]
				},
				{
					emoji: `🖊`,
					name: `pen`,
					keywords: [
						`write`,
						`sign`,
						`ballpoint`,
						`note`
					]
				},
				{
					emoji: `🖌`,
					name: `paintbrush`,
					keywords: [
						`art`,
						`paint`,
						`draw`,
						`color`
					]
				},
				{
					emoji: `🖍`,
					name: `crayon`,
					keywords: [
						`draw`,
						`color`,
						`kids`,
						`art`
					]
				},
				{
					emoji: `📝`,
					name: `memo`,
					keywords: [
						`note`,
						`write`,
						`reminder`,
						`pad`
					]
				},
				{
					emoji: `💼`,
					name: `briefcase`,
					keywords: [
						`work`,
						`office`,
						`business`,
						`job`
					]
				},
				{
					emoji: `📁`,
					name: `file_folder`,
					keywords: [
						`organize`,
						`document`,
						`office`,
						`store`
					]
				},
				{
					emoji: `📂`,
					name: `open_file_folder`,
					keywords: [
						`organize`,
						`document`,
						`browse`,
						`access`
					]
				},
				{
					emoji: `🗂`,
					name: `card_index_dividers`,
					keywords: [
						`organize`,
						`tabs`,
						`file`,
						`sort`
					]
				},
				{
					emoji: `📅`,
					name: `calendar`,
					keywords: [
						`date`,
						`schedule`,
						`plan`,
						`event`
					]
				},
				{
					emoji: `📆`,
					name: `tear_off_calendar`,
					keywords: [
						`date`,
						`day`,
						`schedule`,
						`daily`
					]
				},
				{
					emoji: `🗒`,
					name: `spiral_notepad`,
					keywords: [
						`write`,
						`note`,
						`list`,
						`pad`
					]
				},
				{
					emoji: `🗓`,
					name: `spiral_calendar`,
					keywords: [
						`plan`,
						`schedule`,
						`date`,
						`month`
					]
				},
				{
					emoji: `📇`,
					name: `card_index`,
					keywords: [
						`organize`,
						`rolodex`,
						`contacts`,
						`file`
					]
				},
				{
					emoji: `📈`,
					name: `chart_increasing`,
					keywords: [
						`growth`,
						`profit`,
						`up`,
						`success`
					]
				},
				{
					emoji: `📉`,
					name: `chart_decreasing`,
					keywords: [
						`loss`,
						`down`,
						`decline`,
						`drop`
					]
				},
				{
					emoji: `📊`,
					name: `bar_chart`,
					keywords: [
						`data`,
						`graph`,
						`statistics`,
						`analysis`
					]
				},
				{
					emoji: `📋`,
					name: `clipboard`,
					keywords: [
						`list`,
						`task`,
						`copy`,
						`note`
					]
				},
				{
					emoji: `📌`,
					name: `pushpin`,
					keywords: [
						`pin`,
						`mark`,
						`location`,
						`important`
					]
				},
				{
					emoji: `📍`,
					name: `round_pushpin`,
					keywords: [
						`location`,
						`map`,
						`mark`,
						`pin`
					]
				},
				{
					emoji: `📎`,
					name: `paperclip`,
					keywords: [
						`attach`,
						`document`,
						`office`,
						`clip`
					]
				},
				{
					emoji: `🖇`,
					name: `linked_paperclips`,
					keywords: [
						`attach`,
						`connect`,
						`chain`,
						`link`
					]
				},
				{
					emoji: `📏`,
					name: `straight_ruler`,
					keywords: [
						`measure`,
						`line`,
						`length`,
						`math`
					]
				},
				{
					emoji: `📐`,
					name: `triangular_ruler`,
					keywords: [
						`measure`,
						`angle`,
						`math`,
						`geometry`
					]
				},
				{
					emoji: `✂️`,
					name: `scissors`,
					keywords: [
						`cut`,
						`trim`,
						`craft`,
						`snip`
					]
				},
				{
					emoji: `🗃`,
					name: `card_file_box`,
					keywords: [
						`organize`,
						`archive`,
						`store`,
						`recipe`
					]
				},
				{
					emoji: `🗄`,
					name: `file_cabinet`,
					keywords: [
						`organize`,
						`archive`,
						`store`,
						`office`
					]
				},
				{
					emoji: `🗑`,
					name: `wastebasket`,
					keywords: [
						`trash`,
						`delete`,
						`throw`,
						`recycle`
					]
				},
				{
					emoji: `🔒`,
					name: `locked`,
					keywords: [
						`secure`,
						`private`,
						`closed`,
						`protect`
					]
				},
				{
					emoji: `🔓`,
					name: `unlocked`,
					keywords: [
						`open`,
						`access`,
						`free`,
						`available`
					]
				},
				{
					emoji: `🔏`,
					name: `locked_with_pen`,
					keywords: [
						`secure`,
						`private`,
						`encrypted`,
						`write`
					]
				},
				{
					emoji: `🔐`,
					name: `locked_with_key`,
					keywords: [
						`secure`,
						`private`,
						`encrypted`,
						`protected`
					]
				},
				{
					emoji: `🔑`,
					name: `key`,
					keywords: [
						`unlock`,
						`access`,
						`open`,
						`password`
					]
				},
				{
					emoji: `🗝`,
					name: `old_key`,
					keywords: [
						`vintage`,
						`unlock`,
						`mystery`,
						`antique`
					]
				},
				{
					emoji: `💣`,
					name: `bomb`,
					keywords: [
						`explode`,
						`danger`,
						`boom`,
						`destroy`
					]
				},
				{
					emoji: `🔨`,
					name: `hammer`,
					keywords: [
						`build`,
						`tool`,
						`fix`,
						`nail`
					]
				},
				{
					emoji: `🪓`,
					name: `axe`,
					keywords: [
						`chop`,
						`wood`,
						`tool`,
						`cut`
					]
				},
				{
					emoji: `⛏️`,
					name: `pick`,
					keywords: [
						`mine`,
						`dig`,
						`tool`,
						`rock`
					]
				},
				{
					emoji: `⚒️`,
					name: `hammer_and_pick`,
					keywords: [
						`mine`,
						`build`,
						`work`,
						`tool`
					]
				},
				{
					emoji: `🛠`,
					name: `hammer_and_wrench`,
					keywords: [
						`repair`,
						`fix`,
						`settings`,
						`tool`
					]
				},
				{
					emoji: `🗡`,
					name: `dagger`,
					keywords: [
						`knife`,
						`stab`,
						`weapon`,
						`blade`
					]
				},
				{
					emoji: `⚔️`,
					name: `crossed_swords`,
					keywords: [
						`battle`,
						`fight`,
						`medieval`,
						`combat`
					]
				},
				{
					emoji: `🪃`,
					name: `boomerang`,
					keywords: [
						`return`,
						`throw`,
						`australia`,
						`karma`
					]
				},
				{
					emoji: `🏹`,
					name: `bow_and_arrow`,
					keywords: [`bow`]
				},
				{
					emoji: `🛡`,
					name: `shield`,
					keywords: [
						`protect`,
						`defense`,
						`armor`,
						`guard`
					]
				},
				{
					emoji: `🪚`,
					name: `carpentry_saw`,
					keywords: [`carpentry`, `saw`]
				},
				{
					emoji: `🔧`,
					name: `wrench`,
					keywords: [
						`fix`,
						`repair`,
						`tool`,
						`plumber`
					]
				},
				{
					emoji: `🪛`,
					name: `screwdriver`,
					keywords: [
						`fix`,
						`tool`,
						`screw`,
						`repair`
					]
				},
				{
					emoji: `🔩`,
					name: `nut_and_bolt`,
					keywords: [
						`fix`,
						`hardware`,
						`metal`,
						`secure`
					]
				},
				{
					emoji: `⚙️`,
					name: `gear`,
					keywords: [
						`settings`,
						`mechanical`,
						`engine`,
						`work`
					]
				},
				{
					emoji: `🗜`,
					name: `clamp`,
					keywords: [
						`hold`,
						`compress`,
						`tool`,
						`grip`
					]
				},
				{
					emoji: `⚖️`,
					name: `balance_scale`,
					keywords: [
						`justice`,
						`weigh`,
						`fair`,
						`law`
					]
				},
				{
					emoji: `🦯`,
					name: `white_cane`,
					keywords: [`white`, `cane`]
				},
				{
					emoji: `🔗`,
					name: `link`,
					keywords: [
						`chain`,
						`connect`,
						`url`,
						`web`
					]
				},
				{
					emoji: `⛓️`,
					name: `chains`,
					keywords: [
						`lock`,
						`bound`,
						`connect`,
						`heavy`
					]
				},
				{
					emoji: `🪝`,
					name: `hook`,
					keywords: [
						`hang`,
						`catch`,
						`fish`,
						`pull`
					]
				},
				{
					emoji: `🧰`,
					name: `toolbox`,
					keywords: [
						`tools`,
						`fix`,
						`repair`,
						`handy`
					]
				},
				{
					emoji: `🧲`,
					name: `magnet`,
					keywords: [
						`attract`,
						`metal`,
						`pull`,
						`force`
					]
				},
				{
					emoji: `🪜`,
					name: `ladder`,
					keywords: [
						`climb`,
						`up`,
						`step`,
						`high`
					]
				},
				{
					emoji: `⚗️`,
					name: `alembic`,
					keywords: [`alembic`]
				},
				{
					emoji: `🧪`,
					name: `test_tube`,
					keywords: [
						`science`,
						`lab`,
						`experiment`,
						`chemistry`
					]
				},
				{
					emoji: `🧫`,
					name: `petri_dish`,
					keywords: [
						`science`,
						`lab`,
						`bacteria`,
						`experiment`
					]
				},
				{
					emoji: `🧬`,
					name: `dna`,
					keywords: [
						`genetics`,
						`science`,
						`life`,
						`helix`
					]
				},
				{
					emoji: `🔬`,
					name: `microscope`,
					keywords: [
						`science`,
						`lab`,
						`zoom`,
						`research`
					]
				},
				{
					emoji: `🔭`,
					name: `telescope`,
					keywords: [
						`space`,
						`stars`,
						`look`,
						`astronomy`
					]
				},
				{
					emoji: `📡`,
					name: `satellite_antenna`,
					keywords: [
						`signal`,
						`broadcast`,
						`receive`,
						`dish`
					]
				},
				{
					emoji: `💉`,
					name: `syringe`,
					keywords: [
						`inject`,
						`vaccine`,
						`medicine`,
						`blood`
					]
				},
				{
					emoji: `🩸`,
					name: `drop_of_blood`,
					keywords: [
						`donate`,
						`wound`,
						`health`,
						`red`
					]
				},
				{
					emoji: `💊`,
					name: `pill`,
					keywords: [
						`medicine`,
						`drug`,
						`health`,
						`cure`
					]
				},
				{
					emoji: `🩹`,
					name: `adhesive_bandage`,
					keywords: [
						`wound`,
						`hurt`,
						`fix`,
						`patch`
					]
				},
				{
					emoji: `🩼`,
					name: `crutch`,
					keywords: [`crutch`]
				},
				{
					emoji: `🩺`,
					name: `stethoscope`,
					keywords: [
						`doctor`,
						`health`,
						`heartbeat`,
						`medical`
					]
				},
				{
					emoji: `🩻`,
					name: `x_ray`,
					keywords: [`ray`]
				},
				{
					emoji: `🚪`,
					name: `door`,
					keywords: [
						`enter`,
						`exit`,
						`open`,
						`close`
					]
				},
				{
					emoji: `🛗`,
					name: `elevator`,
					keywords: [
						`up`,
						`down`,
						`floor`,
						`lift`
					]
				},
				{
					emoji: `🪞`,
					name: `mirror`,
					keywords: [
						`reflect`,
						`look`,
						`vanity`,
						`self`
					]
				},
				{
					emoji: `🪟`,
					name: `window`,
					keywords: [
						`view`,
						`glass`,
						`light`,
						`open`
					]
				},
				{
					emoji: `🛏`,
					name: `bed`,
					keywords: [
						`sleep`,
						`rest`,
						`bedroom`,
						`night`
					]
				},
				{
					emoji: `🛋`,
					name: `couch_and_lamp`,
					keywords: [
						`living_room`,
						`relax`,
						`home`,
						`sofa`
					]
				},
				{
					emoji: `🪑`,
					name: `chair`,
					keywords: [
						`sit`,
						`seat`,
						`office`,
						`furniture`
					]
				},
				{
					emoji: `🚽`,
					name: `toilet`,
					keywords: [
						`bathroom`,
						`wc`,
						`restroom`,
						`flush`
					]
				},
				{
					emoji: `🪠`,
					name: `plunger`,
					keywords: [
						`toilet`,
						`fix`,
						`unclog`,
						`bathroom`
					]
				},
				{
					emoji: `🚿`,
					name: `shower`,
					keywords: [
						`wash`,
						`clean`,
						`bathroom`,
						`water`
					]
				},
				{
					emoji: `🛁`,
					name: `bathtub`,
					keywords: [
						`bath`,
						`relax`,
						`clean`,
						`soak`
					]
				},
				{
					emoji: `🪤`,
					name: `mouse_trap`,
					keywords: [
						`catch`,
						`snap`,
						`pest`,
						`cheese`
					]
				},
				{
					emoji: `🪒`,
					name: `razor`,
					keywords: [
						`shave`,
						`blade`,
						`sharp`,
						`grooming`
					]
				},
				{
					emoji: `🧴`,
					name: `lotion_bottle`,
					keywords: [
						`moisturize`,
						`skin`,
						`sunscreen`,
						`cream`
					]
				},
				{
					emoji: `🧷`,
					name: `safety_pin`,
					keywords: [
						`fix`,
						`attach`,
						`diaper`,
						`hold`
					]
				},
				{
					emoji: `🧹`,
					name: `broom`,
					keywords: [
						`sweep`,
						`clean`,
						`witch`,
						`floor`
					]
				},
				{
					emoji: `🧺`,
					name: `basket`,
					keywords: [
						`carry`,
						`picnic`,
						`easter`,
						`weave`
					]
				},
				{
					emoji: `🧻`,
					name: `roll_of_paper`,
					keywords: [
						`toilet`,
						`tissue`,
						`wipe`,
						`roll`
					]
				},
				{
					emoji: `🪣`,
					name: `bucket`,
					keywords: [
						`water`,
						`carry`,
						`mop`,
						`pail`
					]
				},
				{
					emoji: `🧼`,
					name: `soap`,
					keywords: [
						`clean`,
						`wash`,
						`bubble`,
						`hygiene`
					]
				},
				{
					emoji: `🫧`,
					name: `bubbles`,
					keywords: [`bubbles`]
				},
				{
					emoji: `🪥`,
					name: `toothbrush`,
					keywords: [`toothbrush`]
				},
				{
					emoji: `🧽`,
					name: `sponge`,
					keywords: [
						`clean`,
						`absorb`,
						`wash`,
						`soft`
					]
				},
				{
					emoji: `🧯`,
					name: `fire_extinguisher`,
					keywords: [
						`safety`,
						`fire`,
						`emergency`,
						`spray`
					]
				},
				{
					emoji: `🛒`,
					name: `shopping_cart`,
					keywords: [
						`buy`,
						`store`,
						`mall`,
						`groceries`
					]
				},
				{
					emoji: `🧿`,
					name: `nazar_amulet`,
					keywords: [`nazar`, `amulet`]
				},
				{
					emoji: `🪬`,
					name: `hamsa`,
					keywords: [`hamsa`]
				},
				{
					emoji: `🚬`,
					name: `cigarette`,
					keywords: [
						`smoke`,
						`tobacco`,
						`unhealthy`,
						`light`
					]
				},
				{
					emoji: `⚰️`,
					name: `coffin`,
					keywords: [
						`death`,
						`funeral`,
						`rip`,
						`bury`
					]
				},
				{
					emoji: `🪦`,
					name: `headstone`,
					keywords: [
						`grave`,
						`death`,
						`rip`,
						`cemetery`
					]
				},
				{
					emoji: `⚱️`,
					name: `funeral_urn`,
					keywords: [
						`death`,
						`ashes`,
						`cremation`,
						`memorial`
					]
				},
				{
					emoji: `🗿`,
					name: `moai`,
					keywords: [
						`easter_island`,
						`stone`,
						`statue`,
						`ancient`
					]
				},
				{
					emoji: `🪧`,
					name: `placard`,
					keywords: [
						`sign`,
						`protest`,
						`message`,
						`hold`
					]
				},
				{
					emoji: `🪪`,
					name: `identification_card`,
					keywords: [
						`id`,
						`name`,
						`official`,
						`identity`
					]
				}
			]
		},
		{
			id: `symbols`,
			key: `symbols`,
			icon: `🔣`,
			items: [
				{
					emoji: `🏧`,
					name: `atm_sign`,
					keywords: [
						`money`,
						`cash`,
						`withdraw`,
						`bank`
					]
				},
				{
					emoji: `🚮`,
					name: `litter_in_bin_sign`,
					keywords: [
						`trash`,
						`clean`,
						`dispose`,
						`tidy`
					]
				},
				{
					emoji: `🚰`,
					name: `potable_water`,
					keywords: [
						`drink`,
						`safe`,
						`tap`,
						`clean`
					]
				},
				{
					emoji: `♿`,
					name: `wheelchair_symbol`,
					keywords: [
						`accessible`,
						`disability`,
						`ramp`,
						`mobility`
					]
				},
				{
					emoji: `🚹`,
					name: `men_s_room`,
					keywords: [
						`male`,
						`toilet`,
						`bathroom`,
						`wc`
					]
				},
				{
					emoji: `🚺`,
					name: `women_s_room`,
					keywords: [
						`female`,
						`toilet`,
						`bathroom`,
						`wc`
					]
				},
				{
					emoji: `🚻`,
					name: `restroom`,
					keywords: [
						`toilet`,
						`bathroom`,
						`wc`,
						`lavatory`
					]
				},
				{
					emoji: `🚼`,
					name: `baby_symbol`,
					keywords: [
						`child`,
						`infant`,
						`kid`,
						`newborn`
					]
				},
				{
					emoji: `🚾`,
					name: `water_closet`,
					keywords: [
						`toilet`,
						`bathroom`,
						`wc`,
						`flush`
					]
				},
				{
					emoji: `🛂`,
					name: `passport_control`,
					keywords: [
						`travel`,
						`border`,
						`airport`,
						`immigration`
					]
				},
				{
					emoji: `🛃`,
					name: `customs`,
					keywords: [
						`travel`,
						`border`,
						`airport`,
						`declare`
					]
				},
				{
					emoji: `🛄`,
					name: `baggage_claim`,
					keywords: [
						`airport`,
						`luggage`,
						`travel`,
						`arrive`
					]
				},
				{
					emoji: `🛅`,
					name: `left_luggage`,
					keywords: [
						`storage`,
						`locker`,
						`keep`,
						`bag`
					]
				},
				{
					emoji: `⚠️`,
					name: `warning`,
					keywords: [
						`caution`,
						`alert`,
						`danger`,
						`attention`
					]
				},
				{
					emoji: `🚸`,
					name: `children_crossing`,
					keywords: [
						`school`,
						`safety`,
						`road`,
						`kids`
					]
				},
				{
					emoji: `⛔`,
					name: `no_entry`,
					keywords: [
						`stop`,
						`forbidden`,
						`blocked`,
						`wrong_way`
					]
				},
				{
					emoji: `🚫`,
					name: `prohibited`,
					keywords: [
						`ban`,
						`forbidden`,
						`not_allowed`,
						`stop`
					]
				},
				{
					emoji: `🚳`,
					name: `no_bicycles`,
					keywords: [
						`ban`,
						`cycle`,
						`forbidden`,
						`walk`
					]
				},
				{
					emoji: `🚭`,
					name: `no_smoking`,
					keywords: [
						`ban`,
						`health`,
						`forbidden`,
						`cigarette`
					]
				},
				{
					emoji: `🚯`,
					name: `no_littering`,
					keywords: [
						`ban`,
						`clean`,
						`forbidden`,
						`trash`
					]
				},
				{
					emoji: `🚱`,
					name: `non_potable_water`,
					keywords: [
						`unsafe`,
						`drink`,
						`contaminated`,
						`ban`
					]
				},
				{
					emoji: `🚷`,
					name: `no_pedestrians`,
					keywords: [
						`ban`,
						`walk`,
						`forbidden`,
						`danger`
					]
				},
				{
					emoji: `📵`,
					name: `no_mobile_phones`,
					keywords: [
						`ban`,
						`silent`,
						`forbidden`,
						`quiet`
					]
				},
				{
					emoji: `🔞`,
					name: `no_one_under_eighteen`,
					keywords: [
						`adult`,
						`mature`,
						`restricted`,
						`18plus`
					]
				},
				{
					emoji: `☢️`,
					name: `radioactive`,
					keywords: [
						`nuclear`,
						`danger`,
						`radiation`,
						`toxic`
					]
				},
				{
					emoji: `☣️`,
					name: `biohazard`,
					keywords: [
						`danger`,
						`toxic`,
						`contamination`,
						`warning`
					]
				},
				{
					emoji: `⬆️`,
					name: `up_arrow`,
					keywords: [
						`up`,
						`north`,
						`increase`,
						`above`
					]
				},
				{
					emoji: `↗️`,
					name: `up_right_arrow`,
					keywords: [
						`up`,
						`right`,
						`arrow`,
						`top`
					]
				},
				{
					emoji: `➡️`,
					name: `right_arrow`,
					keywords: [
						`next`,
						`forward`,
						`proceed`,
						`go`
					]
				},
				{
					emoji: `↘️`,
					name: `down_right_arrow`,
					keywords: [
						`down`,
						`right`,
						`arrow`,
						`bottom`
					]
				},
				{
					emoji: `⬇️`,
					name: `down_arrow`,
					keywords: [
						`down`,
						`south`,
						`decrease`,
						`below`
					]
				},
				{
					emoji: `↙️`,
					name: `down_left_arrow`,
					keywords: [
						`down`,
						`left`,
						`arrow`,
						`bottom`
					]
				},
				{
					emoji: `⬅️`,
					name: `left_arrow`,
					keywords: [
						`back`,
						`previous`,
						`return`,
						`west`
					]
				},
				{
					emoji: `↖️`,
					name: `up_left_arrow`,
					keywords: [
						`up`,
						`left`,
						`arrow`,
						`top`
					]
				},
				{
					emoji: `↕️`,
					name: `up_down_arrow`,
					keywords: [
						`up`,
						`down`,
						`top`,
						`bottom`
					]
				},
				{
					emoji: `↔️`,
					name: `left_right_arrow`,
					keywords: [
						`left`,
						`right`,
						`arrow`
					]
				},
				{
					emoji: `↩️`,
					name: `right_arrow_curving_left`,
					keywords: [
						`right`,
						`arrow`,
						`curving`,
						`left`
					]
				},
				{
					emoji: `↪️`,
					name: `left_arrow_curving_right`,
					keywords: [
						`left`,
						`arrow`,
						`curving`,
						`right`
					]
				},
				{
					emoji: `⤴️`,
					name: `right_arrow_curving_up`,
					keywords: [
						`right`,
						`arrow`,
						`curving`,
						`top`
					]
				},
				{
					emoji: `⤵️`,
					name: `right_arrow_curving_down`,
					keywords: [
						`right`,
						`arrow`,
						`curving`,
						`bottom`
					]
				},
				{
					emoji: `🔃`,
					name: `clockwise_vertical_arrows`,
					keywords: [
						`clockwise`,
						`vertical`,
						`arrows`
					]
				},
				{
					emoji: `🔄`,
					name: `counterclockwise_arrows_button`,
					keywords: [
						`counterclockwise`,
						`arrows`,
						`button`
					]
				},
				{
					emoji: `🔙`,
					name: `back_arrow`,
					keywords: [
						`return`,
						`previous`,
						`undo`,
						`reverse`
					]
				},
				{
					emoji: `🔚`,
					name: `end_arrow`,
					keywords: [
						`finish`,
						`stop`,
						`complete`,
						`done`
					]
				},
				{
					emoji: `🔛`,
					name: `on_arrow`,
					keywords: [
						`active`,
						`switch`,
						`enable`,
						`start`
					]
				},
				{
					emoji: `🔜`,
					name: `soon_arrow`,
					keywords: [
						`coming`,
						`next`,
						`future`,
						`wait`
					]
				},
				{
					emoji: `🔝`,
					name: `top_arrow`,
					keywords: [
						`best`,
						`first`,
						`above`,
						`peak`
					]
				},
				{
					emoji: `🛐`,
					name: `place_of_worship`,
					keywords: [
						`religion`,
						`pray`,
						`church`,
						`spiritual`
					]
				},
				{
					emoji: `⚛️`,
					name: `atom_symbol`,
					keywords: [
						`science`,
						`physics`,
						`nuclear`,
						`energy`
					]
				},
				{
					emoji: `🕉`,
					name: `om`,
					keywords: [
						`hindu`,
						`buddhist`,
						`meditation`,
						`spiritual`
					]
				},
				{
					emoji: `✡️`,
					name: `star_of_david`,
					keywords: [
						`star`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `☸️`,
					name: `wheel_of_dharma`,
					keywords: [
						`buddhism`,
						`religion`,
						`cycle`,
						`spiritual`
					]
				},
				{
					emoji: `☯️`,
					name: `yin_yang`,
					keywords: [
						`balance`,
						`harmony`,
						`chinese`,
						`philosophy`
					]
				},
				{
					emoji: `✝️`,
					name: `latin_cross`,
					keywords: [
						`no`,
						`cancel`,
						`delete`
					]
				},
				{
					emoji: `☦️`,
					name: `orthodox_cross`,
					keywords: [
						`no`,
						`cancel`,
						`delete`
					]
				},
				{
					emoji: `☪️`,
					name: `star_and_crescent`,
					keywords: [
						`star`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `☮️`,
					name: `peace_symbol`,
					keywords: [
						`love`,
						`hippie`,
						`antiwar`,
						`harmony`
					]
				},
				{
					emoji: `🕎`,
					name: `menorah`,
					keywords: [
						`jewish`,
						`hanukkah`,
						`candle`,
						`religion`
					]
				},
				{
					emoji: `🔯`,
					name: `dotted_six_pointed_star`,
					keywords: [
						`dotted`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `♈`,
					name: `aries`,
					keywords: [
						`zodiac`,
						`march`,
						`april`,
						`ram`
					]
				},
				{
					emoji: `♉`,
					name: `taurus`,
					keywords: [
						`zodiac`,
						`april`,
						`may`,
						`bull`
					]
				},
				{
					emoji: `♊`,
					name: `gemini`,
					keywords: [
						`zodiac`,
						`may`,
						`june`,
						`twins`
					]
				},
				{
					emoji: `♋`,
					name: `cancer`,
					keywords: [
						`zodiac`,
						`june`,
						`july`,
						`crab`
					]
				},
				{
					emoji: `♌`,
					name: `leo`,
					keywords: [
						`zodiac`,
						`july`,
						`august`,
						`lion`
					]
				},
				{
					emoji: `♍`,
					name: `virgo`,
					keywords: [
						`zodiac`,
						`august`,
						`september`,
						`maiden`
					]
				},
				{
					emoji: `♎`,
					name: `libra`,
					keywords: [
						`zodiac`,
						`september`,
						`october`,
						`scales`
					]
				},
				{
					emoji: `♏`,
					name: `scorpio`,
					keywords: [
						`zodiac`,
						`october`,
						`november`,
						`scorpion`
					]
				},
				{
					emoji: `♐`,
					name: `sagittarius`,
					keywords: [
						`zodiac`,
						`november`,
						`december`,
						`archer`
					]
				},
				{
					emoji: `♑`,
					name: `capricorn`,
					keywords: [
						`zodiac`,
						`december`,
						`january`,
						`goat`
					]
				},
				{
					emoji: `♒`,
					name: `aquarius`,
					keywords: [
						`zodiac`,
						`january`,
						`february`,
						`water`
					]
				},
				{
					emoji: `♓`,
					name: `pisces`,
					keywords: [
						`zodiac`,
						`february`,
						`march`,
						`fish`
					]
				},
				{
					emoji: `⛎`,
					name: `ophiuchus`,
					keywords: [
						`zodiac`,
						`serpent`,
						`constellation`,
						`star`
					]
				},
				{
					emoji: `🔀`,
					name: `shuffle_tracks_button`,
					keywords: [
						`shuffle`,
						`tracks`,
						`button`
					]
				},
				{
					emoji: `🔁`,
					name: `repeat_button`,
					keywords: [
						`loop`,
						`again`,
						`cycle`,
						`replay`
					]
				},
				{
					emoji: `🔂`,
					name: `repeat_single_button`,
					keywords: [
						`repeat`,
						`single`,
						`button`
					]
				},
				{
					emoji: `▶️`,
					name: `play_button`,
					keywords: [
						`start`,
						`video`,
						`music`,
						`go`
					]
				},
				{
					emoji: `⏩`,
					name: `fast_forward_button`,
					keywords: [
						`skip`,
						`speed`,
						`next`,
						`ahead`
					]
				},
				{
					emoji: `⏭️`,
					name: `next_track_button`,
					keywords: [
						`skip`,
						`forward`,
						`next`,
						`song`
					]
				},
				{
					emoji: `⏯️`,
					name: `play_or_pause_button`,
					keywords: [
						`play`,
						`pause`,
						`button`
					]
				},
				{
					emoji: `◀️`,
					name: `reverse_button`,
					keywords: [
						`back`,
						`rewind`,
						`previous`,
						`undo`
					]
				},
				{
					emoji: `⏪`,
					name: `fast_reverse_button`,
					keywords: [
						`fast`,
						`reverse`,
						`button`
					]
				},
				{
					emoji: `⏮️`,
					name: `last_track_button`,
					keywords: [
						`last`,
						`track`,
						`button`
					]
				},
				{
					emoji: `🔼`,
					name: `upwards_button`,
					keywords: [`upwards`, `button`]
				},
				{
					emoji: `⏫`,
					name: `fast_up_button`,
					keywords: [`top`]
				},
				{
					emoji: `🔽`,
					name: `downwards_button`,
					keywords: [`downwards`, `button`]
				},
				{
					emoji: `⏬`,
					name: `fast_down_button`,
					keywords: [`bottom`]
				},
				{
					emoji: `⏸️`,
					name: `pause_button`,
					keywords: [
						`wait`,
						`hold`,
						`stop`,
						`break`
					]
				},
				{
					emoji: `⏹️`,
					name: `stop_button`,
					keywords: [
						`end`,
						`halt`,
						`finish`,
						`quit`
					]
				},
				{
					emoji: `⏺️`,
					name: `record_button`,
					keywords: [
						`rec`,
						`video`,
						`audio`,
						`capture`
					]
				},
				{
					emoji: `⏏️`,
					name: `eject_button`,
					keywords: [
						`remove`,
						`disc`,
						`out`,
						`pop`
					]
				},
				{
					emoji: `🎦`,
					name: `cinema`,
					keywords: [
						`movie`,
						`film`,
						`theater`,
						`watch`
					]
				},
				{
					emoji: `🔅`,
					name: `dim_button`,
					keywords: [`dim`, `button`]
				},
				{
					emoji: `🔆`,
					name: `bright_button`,
					keywords: [`bright`, `button`]
				},
				{
					emoji: `📶`,
					name: `antenna_bars`,
					keywords: [`antenna`, `bars`]
				},
				{
					emoji: `📳`,
					name: `vibration_mode`,
					keywords: [`vibration`, `mode`]
				},
				{
					emoji: `📴`,
					name: `mobile_phone_off`,
					keywords: [
						`mobile`,
						`phone`,
						`call`,
						`cell`
					]
				},
				{
					emoji: `♀️`,
					name: `female_sign`,
					keywords: [
						`woman`,
						`girl`,
						`venus`,
						`gender`
					]
				},
				{
					emoji: `♂️`,
					name: `male_sign`,
					keywords: [
						`man`,
						`boy`,
						`mars`,
						`gender`
					]
				},
				{
					emoji: `⚧️`,
					name: `transgender_symbol`,
					keywords: [
						`gender`,
						`identity`,
						`lgbtq`,
						`nonbinary`
					]
				},
				{
					emoji: `✖️`,
					name: `multiply`,
					keywords: [
						`times`,
						`cross`,
						`math`,
						`cancel`
					]
				},
				{
					emoji: `➕`,
					name: `plus`,
					keywords: [
						`add`,
						`positive`,
						`more`,
						`increase`
					]
				},
				{
					emoji: `➖`,
					name: `minus`,
					keywords: [
						`subtract`,
						`negative`,
						`less`,
						`remove`
					]
				},
				{
					emoji: `➗`,
					name: `divide`,
					keywords: [
						`split`,
						`share`,
						`math`,
						`fraction`
					]
				},
				{
					emoji: `🟰`,
					name: `heavy_equals_sign`,
					keywords: [
						`heavy`,
						`equals`,
						`sign`
					]
				},
				{
					emoji: `♾️`,
					name: `infinity`,
					keywords: [
						`forever`,
						`endless`,
						`unlimited`,
						`loop`
					]
				},
				{
					emoji: `‼️`,
					name: `double_exclamation_mark`,
					keywords: [
						`important`,
						`warning`,
						`attention`,
						`notice`
					]
				},
				{
					emoji: `⁉️`,
					name: `exclamation_question_mark`,
					keywords: [
						`important`,
						`warning`,
						`attention`,
						`notice`
					]
				},
				{
					emoji: `❓`,
					name: `red_question_mark`,
					keywords: [
						`what`,
						`why`,
						`ask`,
						`help`
					]
				},
				{
					emoji: `❔`,
					name: `white_question_mark`,
					keywords: [
						`what`,
						`why`,
						`ask`,
						`help`
					]
				},
				{
					emoji: `❕`,
					name: `white_exclamation_mark`,
					keywords: [
						`important`,
						`warning`,
						`attention`,
						`notice`
					]
				},
				{
					emoji: `❗`,
					name: `red_exclamation_mark`,
					keywords: [
						`important`,
						`warning`,
						`attention`,
						`notice`
					]
				},
				{
					emoji: `〰️`,
					name: `wavy_dash`,
					keywords: [
						`decoration`,
						`separator`,
						`line`,
						`wave`
					]
				},
				{
					emoji: `💱`,
					name: `currency_exchange`,
					keywords: [
						`money`,
						`forex`,
						`trade`,
						`convert`
					]
				},
				{
					emoji: `💲`,
					name: `heavy_dollar_sign`,
					keywords: [
						`heavy`,
						`dollar`,
						`sign`
					]
				},
				{
					emoji: `⚕️`,
					name: `medical_symbol`,
					keywords: [
						`health`,
						`doctor`,
						`hospital`,
						`medicine`
					]
				},
				{
					emoji: `♻️`,
					name: `recycling_symbol`,
					keywords: [
						`recycle`,
						`eco`,
						`green`,
						`reuse`
					]
				},
				{
					emoji: `⚜️`,
					name: `fleur_de_lis`,
					keywords: [
						`fleur`,
						`de`,
						`lis`
					]
				},
				{
					emoji: `🔱`,
					name: `trident_emblem`,
					keywords: [
						`poseidon`,
						`sea`,
						`power`,
						`weapon`
					]
				},
				{
					emoji: `📛`,
					name: `name_badge`,
					keywords: [
						`tag`,
						`id`,
						`hello`,
						`introduce`
					]
				},
				{
					emoji: `🔰`,
					name: `japanese_symbol_for_beginner`,
					keywords: [
						`japanese`,
						`symbol`,
						`beginner`
					]
				},
				{
					emoji: `⭕`,
					name: `hollow_red_circle`,
					keywords: [
						`hollow`,
						`red`,
						`circle`
					]
				},
				{
					emoji: `✅`,
					name: `check_mark_button`,
					keywords: [
						`done`,
						`yes`,
						`ok`,
						`correct`
					]
				},
				{
					emoji: `☑️`,
					name: `check_box_with_check`,
					keywords: [
						`done`,
						`yes`,
						`ok`,
						`correct`
					]
				},
				{
					emoji: `✔️`,
					name: `check_mark`,
					keywords: [
						`done`,
						`yes`,
						`ok`,
						`correct`
					]
				},
				{
					emoji: `❌`,
					name: `cross_mark`,
					keywords: [
						`no`,
						`cancel`,
						`delete`
					]
				},
				{
					emoji: `❎`,
					name: `cross_mark_button`,
					keywords: [
						`no`,
						`cancel`,
						`delete`
					]
				},
				{
					emoji: `➰`,
					name: `curly_loop`,
					keywords: [
						`decoration`,
						`fancy`,
						`spiral`,
						`whorl`
					]
				},
				{
					emoji: `➿`,
					name: `double_curly_loop`,
					keywords: [
						`double`,
						`curly`,
						`loop`
					]
				},
				{
					emoji: `〽️`,
					name: `part_alternation_mark`,
					keywords: [
						`part`,
						`alternation`,
						`mark`
					]
				},
				{
					emoji: `✳️`,
					name: `eight_spoked_asterisk`,
					keywords: [
						`eight`,
						`spoked`,
						`asterisk`
					]
				},
				{
					emoji: `✴️`,
					name: `eight_pointed_star`,
					keywords: [
						`eight`,
						`favorite`,
						`sparkle`,
						`rating`
					]
				},
				{
					emoji: `❇️`,
					name: `sparkle`,
					keywords: [
						`sparkle`,
						`magic`,
						`shine`,
						`new`
					]
				},
				{
					emoji: `©️`,
					name: `copyright`,
					keywords: [
						`legal`,
						`owner`,
						`ip`,
						`protect`
					]
				},
				{
					emoji: `®️`,
					name: `registered`,
					keywords: [
						`brand`,
						`trademark`,
						`legal`,
						`official`
					]
				},
				{
					emoji: `™️`,
					name: `trade_mark`,
					keywords: [
						`brand`,
						`logo`,
						`business`,
						`legal`
					]
				},
				{
					emoji: `#️⃣`,
					name: `keycap_hash`,
					keywords: [
						`keycap`,
						`hash`,
						`pound`
					]
				},
				{
					emoji: `*️⃣`,
					name: `keycap_asterisk`,
					keywords: [
						`keycap`,
						`asterisk`,
						`star`
					]
				},
				{
					emoji: `0️⃣`,
					name: `keycap_0`,
					keywords: [`keycap`, `0`]
				},
				{
					emoji: `1️⃣`,
					name: `keycap_1`,
					keywords: [`keycap`, `1`]
				},
				{
					emoji: `2️⃣`,
					name: `keycap_2`,
					keywords: [`keycap`, `2`]
				},
				{
					emoji: `3️⃣`,
					name: `keycap_3`,
					keywords: [`keycap`, `3`]
				},
				{
					emoji: `4️⃣`,
					name: `keycap_4`,
					keywords: [`keycap`, `4`]
				},
				{
					emoji: `5️⃣`,
					name: `keycap_5`,
					keywords: [`keycap`, `5`]
				},
				{
					emoji: `6️⃣`,
					name: `keycap_6`,
					keywords: [`keycap`, `6`]
				},
				{
					emoji: `7️⃣`,
					name: `keycap_7`,
					keywords: [`keycap`, `7`]
				},
				{
					emoji: `8️⃣`,
					name: `keycap_8`,
					keywords: [`keycap`, `8`]
				},
				{
					emoji: `9️⃣`,
					name: `keycap_9`,
					keywords: [`keycap`, `9`]
				},
				{
					emoji: `🔟`,
					name: `keycap_10`,
					keywords: [`keycap`, `10`]
				},
				{
					emoji: `🔠`,
					name: `input_latin_uppercase`,
					keywords: [
						`input`,
						`latin`,
						`uppercase`
					]
				},
				{
					emoji: `🔡`,
					name: `input_latin_lowercase`,
					keywords: [
						`input`,
						`latin`,
						`lowercase`
					]
				},
				{
					emoji: `🔢`,
					name: `input_numbers`,
					keywords: [`input`, `numbers`]
				},
				{
					emoji: `🔣`,
					name: `input_symbols`,
					keywords: [`input`, `symbols`]
				},
				{
					emoji: `🔤`,
					name: `input_latin_letters`,
					keywords: [
						`input`,
						`latin`,
						`letters`
					]
				},
				{
					emoji: `🅰`,
					name: `a_button_blood_type`,
					keywords: [
						`button`,
						`blood`,
						`type`
					]
				},
				{
					emoji: `🆎`,
					name: `ab_button_blood_type`,
					keywords: [
						`ab`,
						`button`,
						`blood`,
						`type`
					]
				},
				{
					emoji: `🅱`,
					name: `b_button_blood_type`,
					keywords: [
						`button`,
						`blood`,
						`type`
					]
				},
				{
					emoji: `🆑`,
					name: `cl_button`,
					keywords: [`cl`, `button`]
				},
				{
					emoji: `🆒`,
					name: `cool_button`,
					keywords: [
						`cool`,
						`button`,
						`awesome`,
						`great`
					]
				},
				{
					emoji: `🆓`,
					name: `free_button`,
					keywords: [
						`gratis`,
						`no_cost`,
						`complimentary`,
						`open`
					]
				},
				{
					emoji: `ℹ️`,
					name: `information`,
					keywords: [
						`info`,
						`help`,
						`ask`,
						`detail`
					]
				},
				{
					emoji: `🆔`,
					name: `id_button`,
					keywords: [`id`, `button`]
				},
				{
					emoji: `Ⓜ️`,
					name: `circled_m`,
					keywords: [`circled`]
				},
				{
					emoji: `🆕`,
					name: `new_button`,
					keywords: [
						`fresh`,
						`recent`,
						`latest`,
						`update`
					]
				},
				{
					emoji: `🆖`,
					name: `ng_button`,
					keywords: [`ng`, `button`]
				},
				{
					emoji: `🅾`,
					name: `o_button_blood_type`,
					keywords: [
						`button`,
						`blood`,
						`type`
					]
				},
				{
					emoji: `🆗`,
					name: `ok_button`,
					keywords: [
						`yes`,
						`agree`,
						`good`,
						`nice`
					]
				},
				{
					emoji: `🅿`,
					name: `p_button`,
					keywords: [`button`]
				},
				{
					emoji: `🆘`,
					name: `sos_button`,
					keywords: [
						`help`,
						`emergency`,
						`rescue`,
						`urgent`
					]
				},
				{
					emoji: `🆙`,
					name: `up_button`,
					keywords: [`top`]
				},
				{
					emoji: `🆚`,
					name: `vs_button`,
					keywords: [`vs`, `button`]
				},
				{
					emoji: `🈁`,
					name: `japanese_here_button`,
					keywords: [
						`japanese`,
						`here`,
						`button`
					]
				},
				{
					emoji: `🈂`,
					name: `japanese_service_charge_button`,
					keywords: [
						`japanese`,
						`service`,
						`charge`,
						`button`
					]
				},
				{
					emoji: `🈷`,
					name: `japanese_monthly_amount_button`,
					keywords: [
						`japanese`,
						`monthly`,
						`amount`,
						`button`
					]
				},
				{
					emoji: `🈶`,
					name: `japanese_not_free_of_charge_button`,
					keywords: [
						`japanese`,
						`not`,
						`free`,
						`charge`
					]
				},
				{
					emoji: `🈯`,
					name: `japanese_reserved_button`,
					keywords: [
						`japanese`,
						`reserved`,
						`button`
					]
				},
				{
					emoji: `🉐`,
					name: `japanese_bargain_button`,
					keywords: [
						`japanese`,
						`bargain`,
						`button`
					]
				},
				{
					emoji: `🈹`,
					name: `japanese_discount_button`,
					keywords: [
						`japanese`,
						`discount`,
						`button`
					]
				},
				{
					emoji: `🈚`,
					name: `japanese_free_of_charge_button`,
					keywords: [
						`japanese`,
						`free`,
						`charge`,
						`button`
					]
				},
				{
					emoji: `🈲`,
					name: `japanese_prohibited_button`,
					keywords: [
						`japanese`,
						`prohibited`,
						`button`
					]
				},
				{
					emoji: `🉑`,
					name: `japanese_acceptable_button`,
					keywords: [
						`japanese`,
						`acceptable`,
						`button`
					]
				},
				{
					emoji: `🈸`,
					name: `japanese_application_button`,
					keywords: [
						`japanese`,
						`application`,
						`button`
					]
				},
				{
					emoji: `🈴`,
					name: `japanese_passing_grade_button`,
					keywords: [
						`japanese`,
						`passing`,
						`grade`,
						`button`
					]
				},
				{
					emoji: `🈳`,
					name: `japanese_vacancy_button`,
					keywords: [
						`japanese`,
						`vacancy`,
						`button`
					]
				},
				{
					emoji: `㊗️`,
					name: `japanese_congratulations_button`,
					keywords: [
						`japanese`,
						`congratulations`,
						`button`
					]
				},
				{
					emoji: `㊙️`,
					name: `japanese_secret_button`,
					keywords: [
						`japanese`,
						`secret`,
						`button`
					]
				},
				{
					emoji: `🈺`,
					name: `japanese_open_for_business_button`,
					keywords: [
						`japanese`,
						`open`,
						`business`,
						`button`
					]
				},
				{
					emoji: `🈵`,
					name: `japanese_no_vacancy_button`,
					keywords: [`japanese`, `no`]
				},
				{
					emoji: `🔴`,
					name: `red_circle`,
					keywords: [
						`color`,
						`dot`,
						`stop`,
						`round`
					]
				},
				{
					emoji: `🟠`,
					name: `orange_circle`,
					keywords: [
						`fruit`,
						`citrus`,
						`juice`,
						`vitamin_c`
					]
				},
				{
					emoji: `🟡`,
					name: `yellow_circle`,
					keywords: [
						`color`,
						`dot`,
						`caution`,
						`round`
					]
				},
				{
					emoji: `🟢`,
					name: `green_circle`,
					keywords: [
						`color`,
						`dot`,
						`go`,
						`round`
					]
				},
				{
					emoji: `🔵`,
					name: `blue_circle`,
					keywords: [
						`color`,
						`dot`,
						`sky`,
						`round`
					]
				},
				{
					emoji: `🟣`,
					name: `purple_circle`,
					keywords: [
						`color`,
						`dot`,
						`lavender`,
						`round`
					]
				},
				{
					emoji: `🟤`,
					name: `brown_circle`,
					keywords: [
						`color`,
						`dot`,
						`earth`,
						`round`
					]
				},
				{
					emoji: `⚫`,
					name: `black_circle`,
					keywords: [
						`color`,
						`dot`,
						`dark`,
						`round`
					]
				},
				{
					emoji: `⚪`,
					name: `white_circle`,
					keywords: [
						`color`,
						`dot`,
						`light`,
						`round`
					]
				},
				{
					emoji: `🟥`,
					name: `red_square`,
					keywords: [
						`color`,
						`block`,
						`shape`,
						`tile`
					]
				},
				{
					emoji: `🟧`,
					name: `orange_square`,
					keywords: [
						`fruit`,
						`citrus`,
						`juice`,
						`vitamin_c`
					]
				},
				{
					emoji: `🟨`,
					name: `yellow_square`,
					keywords: [
						`color`,
						`block`,
						`shape`,
						`tile`
					]
				},
				{
					emoji: `🟩`,
					name: `green_square`,
					keywords: [
						`color`,
						`block`,
						`shape`,
						`tile`
					]
				},
				{
					emoji: `🟦`,
					name: `blue_square`,
					keywords: [
						`color`,
						`block`,
						`shape`,
						`tile`
					]
				},
				{
					emoji: `🟪`,
					name: `purple_square`,
					keywords: [
						`color`,
						`block`,
						`shape`,
						`tile`
					]
				},
				{
					emoji: `🟫`,
					name: `brown_square`,
					keywords: [
						`color`,
						`block`,
						`shape`,
						`tile`
					]
				},
				{
					emoji: `⬛`,
					name: `black_large_square`,
					keywords: [
						`black`,
						`large`,
						`square`
					]
				},
				{
					emoji: `⬜`,
					name: `white_large_square`,
					keywords: [
						`white`,
						`large`,
						`square`
					]
				},
				{
					emoji: `◼️`,
					name: `black_medium_square`,
					keywords: [
						`black`,
						`medium`,
						`square`
					]
				},
				{
					emoji: `◻️`,
					name: `white_medium_square`,
					keywords: [
						`white`,
						`medium`,
						`square`
					]
				},
				{
					emoji: `◾`,
					name: `black_medium_small_square`,
					keywords: [
						`black`,
						`medium`,
						`small`,
						`square`
					]
				},
				{
					emoji: `◽`,
					name: `white_medium_small_square`,
					keywords: [
						`white`,
						`medium`,
						`small`,
						`square`
					]
				},
				{
					emoji: `▪️`,
					name: `black_small_square`,
					keywords: [
						`black`,
						`small`,
						`square`
					]
				},
				{
					emoji: `▫️`,
					name: `white_small_square`,
					keywords: [
						`white`,
						`small`,
						`square`
					]
				},
				{
					emoji: `🔶`,
					name: `large_orange_diamond`,
					keywords: [
						`large`,
						`orange`,
						`diamond`,
						`shape`
					]
				},
				{
					emoji: `🔷`,
					name: `large_blue_diamond`,
					keywords: [
						`large`,
						`blue`,
						`diamond`
					]
				},
				{
					emoji: `🔸`,
					name: `small_orange_diamond`,
					keywords: [
						`small`,
						`orange`,
						`diamond`,
						`shape`
					]
				},
				{
					emoji: `🔹`,
					name: `small_blue_diamond`,
					keywords: [
						`small`,
						`blue`,
						`diamond`
					]
				},
				{
					emoji: `🔺`,
					name: `red_triangle_pointed_up`,
					keywords: [`top`]
				},
				{
					emoji: `🔻`,
					name: `red_triangle_pointed_down`,
					keywords: [`bottom`]
				},
				{
					emoji: `💠`,
					name: `diamond_with_a_dot`,
					keywords: [`diamond`, `dot`]
				},
				{
					emoji: `🔘`,
					name: `radio_button`,
					keywords: [`radio`, `button`]
				},
				{
					emoji: `🔳`,
					name: `white_square_button`,
					keywords: [
						`white`,
						`square`,
						`button`
					]
				},
				{
					emoji: `🔲`,
					name: `black_square_button`,
					keywords: [
						`black`,
						`square`,
						`button`
					]
				}
			]
		},
		{
			id: `flags`,
			key: `flags`,
			icon: `🏁`,
			items: [
				{
					emoji: `🏁`,
					name: `chequered_flag`,
					keywords: [`chequered`, `flag`]
				},
				{
					emoji: `🚩`,
					name: `triangular_flag`,
					keywords: [`triangular`, `flag`]
				},
				{
					emoji: `🎌`,
					name: `crossed_flags`,
					keywords: [
						`luck`,
						`wish`,
						`hope`,
						`fingers`
					]
				},
				{
					emoji: `🏴`,
					name: `black_flag`,
					keywords: [`black`, `flag`]
				},
				{
					emoji: `🏳`,
					name: `white_flag`,
					keywords: [`white`, `flag`]
				},
				{
					emoji: `🏳️‍🌈`,
					name: `rainbow_flag`,
					keywords: [`rainbow`, `flag`]
				},
				{
					emoji: `🏳️‍⚧️`,
					name: `transgender_flag`,
					keywords: [`transgender`, `flag`]
				},
				{
					emoji: `🏴‍☠️`,
					name: `pirate_flag`,
					keywords: [`pirate`, `flag`]
				},
				{
					emoji: `🇦🇨`,
					name: `flag_ascension_island`,
					keywords: [
						`flag`,
						`ascension`,
						`island`
					]
				},
				{
					emoji: `🇦🇩`,
					name: `flag_andorra`,
					keywords: [`flag`, `andorra`]
				},
				{
					emoji: `🇦🇪`,
					name: `flag_united_arab_emirates`,
					keywords: [
						`flag`,
						`united`,
						`arab`,
						`emirates`
					]
				},
				{
					emoji: `🇦🇫`,
					name: `flag_afghanistan`,
					keywords: [`flag`, `afghanistan`]
				},
				{
					emoji: `🇦🇬`,
					name: `flag_antigua_and_barbuda`,
					keywords: [
						`flag`,
						`antigua`,
						`barbuda`
					]
				},
				{
					emoji: `🇦🇮`,
					name: `flag_anguilla`,
					keywords: [`flag`, `anguilla`]
				},
				{
					emoji: `🇦🇱`,
					name: `flag_albania`,
					keywords: [`flag`, `albania`]
				},
				{
					emoji: `🇦🇲`,
					name: `flag_armenia`,
					keywords: [`flag`, `armenia`]
				},
				{
					emoji: `🇦🇴`,
					name: `flag_angola`,
					keywords: [`flag`, `angola`]
				},
				{
					emoji: `🇦🇶`,
					name: `flag_antarctica`,
					keywords: [`flag`, `antarctica`]
				},
				{
					emoji: `🇦🇷`,
					name: `flag_argentina`,
					keywords: [`flag`, `argentina`]
				},
				{
					emoji: `🇦🇸`,
					name: `flag_american_samoa`,
					keywords: [
						`flag`,
						`american`,
						`samoa`
					]
				},
				{
					emoji: `🇦🇹`,
					name: `flag_austria`,
					keywords: [`flag`, `austria`]
				},
				{
					emoji: `🇦🇺`,
					name: `flag_australia`,
					keywords: [`flag`, `australia`]
				},
				{
					emoji: `🇦🇼`,
					name: `flag_aruba`,
					keywords: [`flag`, `aruba`]
				},
				{
					emoji: `🇦🇽`,
					name: `flag_aland_islands`,
					keywords: [
						`flag`,
						`aland`,
						`islands`
					]
				},
				{
					emoji: `🇦🇿`,
					name: `flag_azerbaijan`,
					keywords: [`flag`, `azerbaijan`]
				},
				{
					emoji: `🇧🇦`,
					name: `flag_bosnia_and_herzegovina`,
					keywords: [
						`flag`,
						`bosnia`,
						`herzegovina`
					]
				},
				{
					emoji: `🇧🇧`,
					name: `flag_barbados`,
					keywords: [`flag`, `barbados`]
				},
				{
					emoji: `🇧🇩`,
					name: `flag_bangladesh`,
					keywords: [`flag`, `bangladesh`]
				},
				{
					emoji: `🇧🇪`,
					name: `flag_belgium`,
					keywords: [`flag`, `belgium`]
				},
				{
					emoji: `🇧🇫`,
					name: `flag_burkina_faso`,
					keywords: [
						`flag`,
						`burkina`,
						`faso`
					]
				},
				{
					emoji: `🇧🇬`,
					name: `flag_bulgaria`,
					keywords: [`flag`, `bulgaria`]
				},
				{
					emoji: `🇧🇭`,
					name: `flag_bahrain`,
					keywords: [`flag`, `bahrain`]
				},
				{
					emoji: `🇧🇮`,
					name: `flag_burundi`,
					keywords: [`flag`, `burundi`]
				},
				{
					emoji: `🇧🇯`,
					name: `flag_benin`,
					keywords: [`flag`, `benin`]
				},
				{
					emoji: `🇧🇱`,
					name: `flag_st_barthelemy`,
					keywords: [
						`flag`,
						`st`,
						`barthelemy`
					]
				},
				{
					emoji: `🇧🇲`,
					name: `flag_bermuda`,
					keywords: [`flag`, `bermuda`]
				},
				{
					emoji: `🇧🇳`,
					name: `flag_brunei`,
					keywords: [`flag`, `brunei`]
				},
				{
					emoji: `🇧🇴`,
					name: `flag_bolivia`,
					keywords: [`flag`, `bolivia`]
				},
				{
					emoji: `🇧🇶`,
					name: `flag_caribbean_netherlands`,
					keywords: [
						`flag`,
						`caribbean`,
						`netherlands`
					]
				},
				{
					emoji: `🇧🇷`,
					name: `flag_brazil`,
					keywords: [`flag`, `brazil`]
				},
				{
					emoji: `🇧🇸`,
					name: `flag_bahamas`,
					keywords: [`flag`, `bahamas`]
				},
				{
					emoji: `🇧🇹`,
					name: `flag_bhutan`,
					keywords: [`flag`, `bhutan`]
				},
				{
					emoji: `🇧🇻`,
					name: `flag_bouvet_island`,
					keywords: [
						`flag`,
						`bouvet`,
						`island`
					]
				},
				{
					emoji: `🇧🇼`,
					name: `flag_botswana`,
					keywords: [`flag`, `botswana`]
				},
				{
					emoji: `🇧🇾`,
					name: `flag_belarus`,
					keywords: [`flag`, `belarus`]
				},
				{
					emoji: `🇧🇿`,
					name: `flag_belize`,
					keywords: [`flag`, `belize`]
				},
				{
					emoji: `🇨🇦`,
					name: `flag_canada`,
					keywords: [`flag`, `canada`]
				},
				{
					emoji: `🇨🇨`,
					name: `flag_cocos_keeling_islands`,
					keywords: [
						`flag`,
						`cocos`,
						`keeling`,
						`islands`
					]
				},
				{
					emoji: `🇨🇩`,
					name: `flag_congo_kinshasa`,
					keywords: [
						`flag`,
						`congo`,
						`kinshasa`
					]
				},
				{
					emoji: `🇨🇫`,
					name: `flag_central_african_republic`,
					keywords: [
						`flag`,
						`central`,
						`african`,
						`republic`
					]
				},
				{
					emoji: `🇨🇬`,
					name: `flag_congo_brazzaville`,
					keywords: [
						`flag`,
						`congo`,
						`brazzaville`
					]
				},
				{
					emoji: `🇨🇭`,
					name: `flag_switzerland`,
					keywords: [`flag`, `switzerland`]
				},
				{
					emoji: `🇨🇮`,
					name: `flag_cote_divoire`,
					keywords: [
						`flag`,
						`cote`,
						`divoire`,
						`ivory`
					]
				},
				{
					emoji: `🇨🇰`,
					name: `flag_cook_islands`,
					keywords: [
						`chef`,
						`food`,
						`kitchen`,
						`culinary`
					]
				},
				{
					emoji: `🇨🇱`,
					name: `flag_chile`,
					keywords: [`flag`, `chile`]
				},
				{
					emoji: `🇨🇲`,
					name: `flag_cameroon`,
					keywords: [`flag`, `cameroon`]
				},
				{
					emoji: `🇨🇳`,
					name: `flag_china`,
					keywords: [`flag`, `china`]
				},
				{
					emoji: `🇨🇴`,
					name: `flag_colombia`,
					keywords: [`flag`, `colombia`]
				},
				{
					emoji: `🇨🇵`,
					name: `flag_clipperton_island`,
					keywords: [
						`flag`,
						`clipperton`,
						`island`
					]
				},
				{
					emoji: `🇨🇷`,
					name: `flag_costa_rica`,
					keywords: [
						`flag`,
						`costa`,
						`rica`
					]
				},
				{
					emoji: `🇨🇺`,
					name: `flag_cuba`,
					keywords: [`flag`, `cuba`]
				},
				{
					emoji: `🇨🇻`,
					name: `flag_cape_verde`,
					keywords: [
						`flag`,
						`cape`,
						`verde`
					]
				},
				{
					emoji: `🇨🇼`,
					name: `flag_curacao`,
					keywords: [`flag`, `curacao`]
				},
				{
					emoji: `🇨🇽`,
					name: `flag_christmas_island`,
					keywords: [
						`flag`,
						`christmas`,
						`island`
					]
				},
				{
					emoji: `🇨🇾`,
					name: `flag_cyprus`,
					keywords: [`flag`, `cyprus`]
				},
				{
					emoji: `🇨🇿`,
					name: `flag_czechia`,
					keywords: [`flag`, `czechia`]
				},
				{
					emoji: `🇩🇪`,
					name: `flag_germany`,
					keywords: [`flag`, `germany`]
				},
				{
					emoji: `🇩🇬`,
					name: `flag_diego_garcia`,
					keywords: [
						`flag`,
						`diego`,
						`garcia`
					]
				},
				{
					emoji: `🇩🇯`,
					name: `flag_djibouti`,
					keywords: [`flag`, `djibouti`]
				},
				{
					emoji: `🇩🇰`,
					name: `flag_denmark`,
					keywords: [`flag`, `denmark`]
				},
				{
					emoji: `🇩🇲`,
					name: `flag_dominica`,
					keywords: [`flag`, `dominica`]
				},
				{
					emoji: `🇩🇴`,
					name: `flag_dominican_republic`,
					keywords: [
						`flag`,
						`dominican`,
						`republic`
					]
				},
				{
					emoji: `🇩🇿`,
					name: `flag_algeria`,
					keywords: [`flag`, `algeria`]
				},
				{
					emoji: `🇪🇦`,
					name: `flag_ceuta_and_melilla`,
					keywords: [
						`flag`,
						`ceuta`,
						`melilla`
					]
				},
				{
					emoji: `🇪🇨`,
					name: `flag_ecuador`,
					keywords: [`flag`, `ecuador`]
				},
				{
					emoji: `🇪🇪`,
					name: `flag_estonia`,
					keywords: [`flag`, `estonia`]
				},
				{
					emoji: `🇪🇬`,
					name: `flag_egypt`,
					keywords: [`flag`, `egypt`]
				},
				{
					emoji: `🇪🇭`,
					name: `flag_western_sahara`,
					keywords: [
						`flag`,
						`western`,
						`sahara`
					]
				},
				{
					emoji: `🇪🇷`,
					name: `flag_eritrea`,
					keywords: [`flag`, `eritrea`]
				},
				{
					emoji: `🇪🇸`,
					name: `flag_spain`,
					keywords: [`flag`, `spain`]
				},
				{
					emoji: `🇪🇹`,
					name: `flag_ethiopia`,
					keywords: [`flag`, `ethiopia`]
				},
				{
					emoji: `🇪🇺`,
					name: `flag_european_union`,
					keywords: [
						`flag`,
						`european`,
						`union`
					]
				},
				{
					emoji: `🇫🇮`,
					name: `flag_finland`,
					keywords: [`flag`, `finland`]
				},
				{
					emoji: `🇫🇯`,
					name: `flag_fiji`,
					keywords: [`flag`, `fiji`]
				},
				{
					emoji: `🇫🇰`,
					name: `flag_falkland_islands`,
					keywords: [
						`flag`,
						`falkland`,
						`islands`
					]
				},
				{
					emoji: `🇫🇲`,
					name: `flag_micronesia`,
					keywords: [`flag`, `micronesia`]
				},
				{
					emoji: `🇫🇴`,
					name: `flag_faroe_islands`,
					keywords: [
						`flag`,
						`faroe`,
						`islands`
					]
				},
				{
					emoji: `🇫🇷`,
					name: `flag_france`,
					keywords: [`flag`, `france`]
				},
				{
					emoji: `🇬🇦`,
					name: `flag_gabon`,
					keywords: [`flag`, `gabon`]
				},
				{
					emoji: `🇬🇧`,
					name: `flag_united_kingdom`,
					keywords: [
						`flag`,
						`united`,
						`kingdom`
					]
				},
				{
					emoji: `🇬🇩`,
					name: `flag_grenada`,
					keywords: [`flag`, `grenada`]
				},
				{
					emoji: `🇬🇪`,
					name: `flag_georgia`,
					keywords: [`flag`, `georgia`]
				},
				{
					emoji: `🇬🇫`,
					name: `flag_french_guiana`,
					keywords: [
						`flag`,
						`french`,
						`guiana`
					]
				},
				{
					emoji: `🇬🇬`,
					name: `flag_guernsey`,
					keywords: [`flag`, `guernsey`]
				},
				{
					emoji: `🇬🇭`,
					name: `flag_ghana`,
					keywords: [`flag`, `ghana`]
				},
				{
					emoji: `🇬🇮`,
					name: `flag_gibraltar`,
					keywords: [`flag`, `gibraltar`]
				},
				{
					emoji: `🇬🇱`,
					name: `flag_greenland`,
					keywords: [`flag`, `greenland`]
				},
				{
					emoji: `🇬🇲`,
					name: `flag_gambia`,
					keywords: [`flag`, `gambia`]
				},
				{
					emoji: `🇬🇳`,
					name: `flag_guinea`,
					keywords: [`flag`, `guinea`]
				},
				{
					emoji: `🇬🇵`,
					name: `flag_guadeloupe`,
					keywords: [`flag`, `guadeloupe`]
				},
				{
					emoji: `🇬🇶`,
					name: `flag_equatorial_guinea`,
					keywords: [
						`flag`,
						`equatorial`,
						`guinea`
					]
				},
				{
					emoji: `🇬🇷`,
					name: `flag_greece`,
					keywords: [`flag`, `greece`]
				},
				{
					emoji: `🇬🇸`,
					name: `flag_south_georgia_and_south_sandwich_islands`,
					keywords: [
						`flag`,
						`south`,
						`georgia`,
						`sandwich`
					]
				},
				{
					emoji: `🇬🇹`,
					name: `flag_guatemala`,
					keywords: [`flag`, `guatemala`]
				},
				{
					emoji: `🇬🇺`,
					name: `flag_guam`,
					keywords: [`flag`, `guam`]
				},
				{
					emoji: `🇬🇼`,
					name: `flag_guinea_bissau`,
					keywords: [
						`flag`,
						`guinea`,
						`bissau`
					]
				},
				{
					emoji: `🇬🇾`,
					name: `flag_guyana`,
					keywords: [`flag`, `guyana`]
				},
				{
					emoji: `🇭🇰`,
					name: `flag_hong_kong_sar_china`,
					keywords: [
						`flag`,
						`hong`,
						`kong`,
						`sar`
					]
				},
				{
					emoji: `🇭🇲`,
					name: `flag_heard_and_mcdonald_islands`,
					keywords: [
						`flag`,
						`heard`,
						`mcdonald`,
						`islands`
					]
				},
				{
					emoji: `🇭🇳`,
					name: `flag_honduras`,
					keywords: [`flag`, `honduras`]
				},
				{
					emoji: `🇭🇷`,
					name: `flag_croatia`,
					keywords: [`flag`, `croatia`]
				},
				{
					emoji: `🇭🇹`,
					name: `flag_haiti`,
					keywords: [`flag`, `haiti`]
				},
				{
					emoji: `🇭🇺`,
					name: `flag_hungary`,
					keywords: [`flag`, `hungary`]
				},
				{
					emoji: `🇮🇨`,
					name: `flag_canary_islands`,
					keywords: [
						`flag`,
						`canary`,
						`islands`
					]
				},
				{
					emoji: `🇮🇩`,
					name: `flag_indonesia`,
					keywords: [`flag`, `indonesia`]
				},
				{
					emoji: `🇮🇪`,
					name: `flag_ireland`,
					keywords: [`flag`, `ireland`]
				},
				{
					emoji: `🇮🇱`,
					name: `flag_israel`,
					keywords: [`flag`, `israel`]
				},
				{
					emoji: `🇮🇲`,
					name: `flag_isle_of_man`,
					keywords: [
						`male`,
						`guy`,
						`person`,
						`adult`
					]
				},
				{
					emoji: `🇮🇳`,
					name: `flag_india`,
					keywords: [`flag`, `india`]
				},
				{
					emoji: `🇮🇴`,
					name: `flag_british_indian_ocean_territory`,
					keywords: [
						`flag`,
						`british`,
						`indian`,
						`ocean`
					]
				},
				{
					emoji: `🇮🇶`,
					name: `flag_iraq`,
					keywords: [`flag`, `iraq`]
				},
				{
					emoji: `🇮🇷`,
					name: `flag_iran`,
					keywords: [`flag`, `iran`]
				},
				{
					emoji: `🇮🇸`,
					name: `flag_iceland`,
					keywords: [`flag`, `iceland`]
				},
				{
					emoji: `🇮🇹`,
					name: `flag_italy`,
					keywords: [`flag`, `italy`]
				},
				{
					emoji: `🇯🇪`,
					name: `flag_jersey`,
					keywords: [`flag`, `jersey`]
				},
				{
					emoji: `🇯🇲`,
					name: `flag_jamaica`,
					keywords: [`flag`, `jamaica`]
				},
				{
					emoji: `🇯🇴`,
					name: `flag_jordan`,
					keywords: [`flag`, `jordan`]
				},
				{
					emoji: `🇯🇵`,
					name: `flag_japan`,
					keywords: [`flag`, `japan`]
				},
				{
					emoji: `🇰🇪`,
					name: `flag_kenya`,
					keywords: [`flag`, `kenya`]
				},
				{
					emoji: `🇰🇬`,
					name: `flag_kyrgyzstan`,
					keywords: [`flag`, `kyrgyzstan`]
				},
				{
					emoji: `🇰🇭`,
					name: `flag_cambodia`,
					keywords: [`flag`, `cambodia`]
				},
				{
					emoji: `🇰🇮`,
					name: `flag_kiribati`,
					keywords: [`flag`, `kiribati`]
				},
				{
					emoji: `🇰🇲`,
					name: `flag_comoros`,
					keywords: [`flag`, `comoros`]
				},
				{
					emoji: `🇰🇳`,
					name: `flag_st_kitts_and_nevis`,
					keywords: [
						`flag`,
						`st`,
						`kitts`,
						`nevis`
					]
				},
				{
					emoji: `🇰🇵`,
					name: `flag_north_korea`,
					keywords: [
						`flag`,
						`north`,
						`korea`
					]
				},
				{
					emoji: `🇰🇷`,
					name: `flag_south_korea`,
					keywords: [
						`flag`,
						`south`,
						`korea`
					]
				},
				{
					emoji: `🇰🇼`,
					name: `flag_kuwait`,
					keywords: [`flag`, `kuwait`]
				},
				{
					emoji: `🇰🇾`,
					name: `flag_cayman_islands`,
					keywords: [
						`flag`,
						`cayman`,
						`islands`
					]
				},
				{
					emoji: `🇰🇿`,
					name: `flag_kazakhstan`,
					keywords: [`flag`, `kazakhstan`]
				},
				{
					emoji: `🇱🇦`,
					name: `flag_laos`,
					keywords: [`flag`, `laos`]
				},
				{
					emoji: `🇱🇧`,
					name: `flag_lebanon`,
					keywords: [`flag`, `lebanon`]
				},
				{
					emoji: `🇱🇨`,
					name: `flag_st_lucia`,
					keywords: [
						`flag`,
						`st`,
						`lucia`
					]
				},
				{
					emoji: `🇱🇮`,
					name: `flag_liechtenstein`,
					keywords: [`flag`, `liechtenstein`]
				},
				{
					emoji: `🇱🇰`,
					name: `flag_sri_lanka`,
					keywords: [
						`flag`,
						`sri`,
						`lanka`
					]
				},
				{
					emoji: `🇱🇷`,
					name: `flag_liberia`,
					keywords: [`flag`, `liberia`]
				},
				{
					emoji: `🇱🇸`,
					name: `flag_lesotho`,
					keywords: [`flag`, `lesotho`]
				},
				{
					emoji: `🇱🇹`,
					name: `flag_lithuania`,
					keywords: [`flag`, `lithuania`]
				},
				{
					emoji: `🇱🇺`,
					name: `flag_luxembourg`,
					keywords: [`flag`, `luxembourg`]
				},
				{
					emoji: `🇱🇻`,
					name: `flag_latvia`,
					keywords: [`flag`, `latvia`]
				},
				{
					emoji: `🇱🇾`,
					name: `flag_libya`,
					keywords: [`flag`, `libya`]
				},
				{
					emoji: `🇲🇦`,
					name: `flag_morocco`,
					keywords: [`flag`, `morocco`]
				},
				{
					emoji: `🇲🇨`,
					name: `flag_monaco`,
					keywords: [`flag`, `monaco`]
				},
				{
					emoji: `🇲🇩`,
					name: `flag_moldova`,
					keywords: [`flag`, `moldova`]
				},
				{
					emoji: `🇲🇪`,
					name: `flag_montenegro`,
					keywords: [`flag`, `montenegro`]
				},
				{
					emoji: `🇲🇫`,
					name: `flag_st_martin`,
					keywords: [
						`flag`,
						`st`,
						`martin`
					]
				},
				{
					emoji: `🇲🇬`,
					name: `flag_madagascar`,
					keywords: [`flag`, `madagascar`]
				},
				{
					emoji: `🇲🇭`,
					name: `flag_marshall_islands`,
					keywords: [
						`flag`,
						`marshall`,
						`islands`
					]
				},
				{
					emoji: `🇲🇰`,
					name: `flag_north_macedonia`,
					keywords: [
						`flag`,
						`north`,
						`macedonia`
					]
				},
				{
					emoji: `🇲🇱`,
					name: `flag_mali`,
					keywords: [`flag`, `mali`]
				},
				{
					emoji: `🇲🇲`,
					name: `flag_myanmar_burma`,
					keywords: [
						`flag`,
						`myanmar`,
						`burma`
					]
				},
				{
					emoji: `🇲🇳`,
					name: `flag_mongolia`,
					keywords: [`flag`, `mongolia`]
				},
				{
					emoji: `🇲🇴`,
					name: `flag_macao_sar_china`,
					keywords: [
						`flag`,
						`macao`,
						`sar`,
						`china`
					]
				},
				{
					emoji: `🇲🇵`,
					name: `flag_northern_mariana_islands`,
					keywords: [
						`flag`,
						`northern`,
						`mariana`,
						`islands`
					]
				},
				{
					emoji: `🇲🇶`,
					name: `flag_martinique`,
					keywords: [`flag`, `martinique`]
				},
				{
					emoji: `🇲🇷`,
					name: `flag_mauritania`,
					keywords: [`flag`, `mauritania`]
				},
				{
					emoji: `🇲🇸`,
					name: `flag_montserrat`,
					keywords: [`flag`, `montserrat`]
				},
				{
					emoji: `🇲🇹`,
					name: `flag_malta`,
					keywords: [`flag`, `malta`]
				},
				{
					emoji: `🇲🇺`,
					name: `flag_mauritius`,
					keywords: [`flag`, `mauritius`]
				},
				{
					emoji: `🇲🇻`,
					name: `flag_maldives`,
					keywords: [`flag`, `maldives`]
				},
				{
					emoji: `🇲🇼`,
					name: `flag_malawi`,
					keywords: [`flag`, `malawi`]
				},
				{
					emoji: `🇲🇽`,
					name: `flag_mexico`,
					keywords: [`flag`, `mexico`]
				},
				{
					emoji: `🇲🇾`,
					name: `flag_malaysia`,
					keywords: [`flag`, `malaysia`]
				},
				{
					emoji: `🇲🇿`,
					name: `flag_mozambique`,
					keywords: [`flag`, `mozambique`]
				},
				{
					emoji: `🇳🇦`,
					name: `flag_namibia`,
					keywords: [`flag`, `namibia`]
				},
				{
					emoji: `🇳🇨`,
					name: `flag_new_caledonia`,
					keywords: [
						`flag`,
						`new`,
						`caledonia`
					]
				},
				{
					emoji: `🇳🇪`,
					name: `flag_niger`,
					keywords: [`flag`, `niger`]
				},
				{
					emoji: `🇳🇫`,
					name: `flag_norfolk_island`,
					keywords: [
						`flag`,
						`norfolk`,
						`island`
					]
				},
				{
					emoji: `🇳🇬`,
					name: `flag_nigeria`,
					keywords: [`flag`, `nigeria`]
				},
				{
					emoji: `🇳🇮`,
					name: `flag_nicaragua`,
					keywords: [`flag`, `nicaragua`]
				},
				{
					emoji: `🇳🇱`,
					name: `flag_netherlands`,
					keywords: [`flag`, `netherlands`]
				},
				{
					emoji: `🇳🇴`,
					name: `flag_norway`,
					keywords: [`flag`, `norway`]
				},
				{
					emoji: `🇳🇵`,
					name: `flag_nepal`,
					keywords: [`flag`, `nepal`]
				},
				{
					emoji: `🇳🇷`,
					name: `flag_nauru`,
					keywords: [`flag`, `nauru`]
				},
				{
					emoji: `🇳🇺`,
					name: `flag_niue`,
					keywords: [`flag`, `niue`]
				},
				{
					emoji: `🇳🇿`,
					name: `flag_new_zealand`,
					keywords: [
						`flag`,
						`new`,
						`zealand`
					]
				},
				{
					emoji: `🇴🇲`,
					name: `flag_oman`,
					keywords: [`flag`, `oman`]
				},
				{
					emoji: `🇵🇦`,
					name: `flag_panama`,
					keywords: [`flag`, `panama`]
				},
				{
					emoji: `🇵🇪`,
					name: `flag_peru`,
					keywords: [`flag`, `peru`]
				},
				{
					emoji: `🇵🇫`,
					name: `flag_french_polynesia`,
					keywords: [
						`flag`,
						`french`,
						`polynesia`
					]
				},
				{
					emoji: `🇵🇬`,
					name: `flag_papua_new_guinea`,
					keywords: [
						`flag`,
						`papua`,
						`new`,
						`guinea`
					]
				},
				{
					emoji: `🇵🇭`,
					name: `flag_philippines`,
					keywords: [`flag`, `philippines`]
				},
				{
					emoji: `🇵🇰`,
					name: `flag_pakistan`,
					keywords: [`flag`, `pakistan`]
				},
				{
					emoji: `🇵🇱`,
					name: `flag_poland`,
					keywords: [`flag`, `poland`]
				},
				{
					emoji: `🇵🇲`,
					name: `flag_st_pierre_and_miquelon`,
					keywords: [
						`flag`,
						`st`,
						`pierre`,
						`miquelon`
					]
				},
				{
					emoji: `🇵🇳`,
					name: `flag_pitcairn_islands`,
					keywords: [
						`flag`,
						`pitcairn`,
						`islands`
					]
				},
				{
					emoji: `🇵🇷`,
					name: `flag_puerto_rico`,
					keywords: [
						`flag`,
						`puerto`,
						`rico`
					]
				},
				{
					emoji: `🇵🇸`,
					name: `flag_palestinian_territories`,
					keywords: [
						`flag`,
						`palestinian`,
						`territories`
					]
				},
				{
					emoji: `🇵🇹`,
					name: `flag_portugal`,
					keywords: [`flag`, `portugal`]
				},
				{
					emoji: `🇵🇼`,
					name: `flag_palau`,
					keywords: [`flag`, `palau`]
				},
				{
					emoji: `🇵🇾`,
					name: `flag_paraguay`,
					keywords: [`flag`, `paraguay`]
				},
				{
					emoji: `🇶🇦`,
					name: `flag_qatar`,
					keywords: [`flag`, `qatar`]
				},
				{
					emoji: `🇷🇪`,
					name: `flag_reunion`,
					keywords: [`flag`, `reunion`]
				},
				{
					emoji: `🇷🇴`,
					name: `flag_romania`,
					keywords: [`flag`, `romania`]
				},
				{
					emoji: `🇷🇸`,
					name: `flag_serbia`,
					keywords: [`flag`, `serbia`]
				},
				{
					emoji: `🇷🇺`,
					name: `flag_russia`,
					keywords: [`flag`, `russia`]
				},
				{
					emoji: `🇷🇼`,
					name: `flag_rwanda`,
					keywords: [`flag`, `rwanda`]
				},
				{
					emoji: `🇸🇦`,
					name: `flag_saudi_arabia`,
					keywords: [
						`flag`,
						`saudi`,
						`arabia`
					]
				},
				{
					emoji: `🇸🇧`,
					name: `flag_solomon_islands`,
					keywords: [
						`flag`,
						`solomon`,
						`islands`
					]
				},
				{
					emoji: `🇸🇨`,
					name: `flag_seychelles`,
					keywords: [`flag`, `seychelles`]
				},
				{
					emoji: `🇸🇩`,
					name: `flag_sudan`,
					keywords: [`flag`, `sudan`]
				},
				{
					emoji: `🇸🇪`,
					name: `flag_sweden`,
					keywords: [`flag`, `sweden`]
				},
				{
					emoji: `🇸🇬`,
					name: `flag_singapore`,
					keywords: [`flag`, `singapore`]
				},
				{
					emoji: `🇸🇭`,
					name: `flag_st_helena`,
					keywords: [
						`flag`,
						`st`,
						`helena`
					]
				},
				{
					emoji: `🇸🇮`,
					name: `flag_slovenia`,
					keywords: [`flag`, `slovenia`]
				},
				{
					emoji: `🇸🇯`,
					name: `flag_svalbard_and_jan_mayen`,
					keywords: [
						`flag`,
						`svalbard`,
						`jan`,
						`mayen`
					]
				},
				{
					emoji: `🇸🇰`,
					name: `flag_slovakia`,
					keywords: [`flag`, `slovakia`]
				},
				{
					emoji: `🇸🇱`,
					name: `flag_sierra_leone`,
					keywords: [
						`flag`,
						`sierra`,
						`leone`
					]
				},
				{
					emoji: `🇸🇲`,
					name: `flag_san_marino`,
					keywords: [
						`flag`,
						`san`,
						`marino`
					]
				},
				{
					emoji: `🇸🇳`,
					name: `flag_senegal`,
					keywords: [`flag`, `senegal`]
				},
				{
					emoji: `🇸🇴`,
					name: `flag_somalia`,
					keywords: [`flag`, `somalia`]
				},
				{
					emoji: `🇸🇷`,
					name: `flag_suriname`,
					keywords: [`flag`, `suriname`]
				},
				{
					emoji: `🇸🇸`,
					name: `flag_south_sudan`,
					keywords: [
						`flag`,
						`south`,
						`sudan`
					]
				},
				{
					emoji: `🇸🇹`,
					name: `flag_sao_tome_and_principe`,
					keywords: [
						`flag`,
						`sao`,
						`tome`,
						`principe`
					]
				},
				{
					emoji: `🇸🇻`,
					name: `flag_el_salvador`,
					keywords: [
						`flag`,
						`el`,
						`salvador`
					]
				},
				{
					emoji: `🇸🇽`,
					name: `flag_sint_maarten`,
					keywords: [
						`flag`,
						`sint`,
						`maarten`
					]
				},
				{
					emoji: `🇸🇾`,
					name: `flag_syria`,
					keywords: [`flag`, `syria`]
				},
				{
					emoji: `🇸🇿`,
					name: `flag_eswatini`,
					keywords: [`flag`, `eswatini`]
				},
				{
					emoji: `🇹🇦`,
					name: `flag_tristan_da_cunha`,
					keywords: [
						`flag`,
						`tristan`,
						`da`,
						`cunha`
					]
				},
				{
					emoji: `🇹🇨`,
					name: `flag_turks_and_caicos_islands`,
					keywords: [
						`flag`,
						`turks`,
						`caicos`,
						`islands`
					]
				},
				{
					emoji: `🇹🇩`,
					name: `flag_chad`,
					keywords: [`flag`, `chad`]
				},
				{
					emoji: `🇹🇫`,
					name: `flag_french_southern_territories`,
					keywords: [
						`flag`,
						`french`,
						`southern`,
						`territories`
					]
				},
				{
					emoji: `🇹🇬`,
					name: `flag_togo`,
					keywords: [`flag`, `togo`]
				},
				{
					emoji: `🇹🇭`,
					name: `flag_thailand`,
					keywords: [`flag`, `thailand`]
				},
				{
					emoji: `🇹🇯`,
					name: `flag_tajikistan`,
					keywords: [`flag`, `tajikistan`]
				},
				{
					emoji: `🇹🇰`,
					name: `flag_tokelau`,
					keywords: [`flag`, `tokelau`]
				},
				{
					emoji: `🇹🇱`,
					name: `flag_timor_leste`,
					keywords: [
						`flag`,
						`timor`,
						`leste`
					]
				},
				{
					emoji: `🇹🇲`,
					name: `flag_turkmenistan`,
					keywords: [`flag`, `turkmenistan`]
				},
				{
					emoji: `🇹🇳`,
					name: `flag_tunisia`,
					keywords: [`flag`, `tunisia`]
				},
				{
					emoji: `🇹🇴`,
					name: `flag_tonga`,
					keywords: [`flag`, `tonga`]
				},
				{
					emoji: `🇹🇷`,
					name: `flag_turkiye`,
					keywords: [
						`flag`,
						`turkiye`,
						`turkey`
					]
				},
				{
					emoji: `🇹🇹`,
					name: `flag_trinidad_and_tobago`,
					keywords: [
						`flag`,
						`trinidad`,
						`tobago`
					]
				},
				{
					emoji: `🇹🇻`,
					name: `flag_tuvalu`,
					keywords: [`flag`, `tuvalu`]
				},
				{
					emoji: `🇹🇿`,
					name: `flag_tanzania`,
					keywords: [`flag`, `tanzania`]
				},
				{
					emoji: `🇺🇦`,
					name: `flag_ukraine`,
					keywords: [`flag`, `ukraine`]
				},
				{
					emoji: `🇺🇬`,
					name: `flag_uganda`,
					keywords: [`flag`, `uganda`]
				},
				{
					emoji: `🇺🇲`,
					name: `flag_u_s_outlying_islands`,
					keywords: [
						`flag`,
						`outlying`,
						`islands`
					]
				},
				{
					emoji: `🇺🇳`,
					name: `flag_united_nations`,
					keywords: [
						`flag`,
						`united`,
						`nations`
					]
				},
				{
					emoji: `🇺🇸`,
					name: `flag_united_states`,
					keywords: [
						`flag`,
						`united`,
						`states`
					]
				},
				{
					emoji: `🇺🇾`,
					name: `flag_uruguay`,
					keywords: [`flag`, `uruguay`]
				},
				{
					emoji: `🇺🇿`,
					name: `flag_uzbekistan`,
					keywords: [`flag`, `uzbekistan`]
				},
				{
					emoji: `🇻🇦`,
					name: `flag_vatican_city`,
					keywords: [
						`flag`,
						`vatican`,
						`city`
					]
				},
				{
					emoji: `🇻🇨`,
					name: `flag_st_vincent_and_grenadines`,
					keywords: [
						`flag`,
						`st`,
						`vincent`,
						`grenadines`
					]
				},
				{
					emoji: `🇻🇪`,
					name: `flag_venezuela`,
					keywords: [`flag`, `venezuela`]
				},
				{
					emoji: `🇻🇬`,
					name: `flag_british_virgin_islands`,
					keywords: [
						`flag`,
						`british`,
						`virgin`,
						`islands`
					]
				},
				{
					emoji: `🇻🇮`,
					name: `flag_u_s_virgin_islands`,
					keywords: [
						`flag`,
						`virgin`,
						`islands`
					]
				},
				{
					emoji: `🇻🇳`,
					name: `flag_vietnam`,
					keywords: [`flag`, `vietnam`]
				},
				{
					emoji: `🇻🇺`,
					name: `flag_vanuatu`,
					keywords: [`flag`, `vanuatu`]
				},
				{
					emoji: `🇼🇫`,
					name: `flag_wallis_and_futuna`,
					keywords: [
						`flag`,
						`wallis`,
						`futuna`
					]
				},
				{
					emoji: `🇼🇸`,
					name: `flag_samoa`,
					keywords: [`flag`, `samoa`]
				},
				{
					emoji: `🇽🇰`,
					name: `flag_kosovo`,
					keywords: [`flag`, `kosovo`]
				},
				{
					emoji: `🇾🇪`,
					name: `flag_yemen`,
					keywords: [`flag`, `yemen`]
				},
				{
					emoji: `🇾🇹`,
					name: `flag_mayotte`,
					keywords: [`flag`, `mayotte`]
				},
				{
					emoji: `🇿🇦`,
					name: `flag_south_africa`,
					keywords: [
						`flag`,
						`south`,
						`africa`
					]
				},
				{
					emoji: `🇿🇲`,
					name: `flag_zambia`,
					keywords: [`flag`, `zambia`]
				},
				{
					emoji: `🇿🇼`,
					name: `flag_zimbabwe`,
					keywords: [`flag`, `zimbabwe`]
				},
				{
					emoji: `🏴󠁧󠁢󠁥󠁮󠁧󠁿`,
					name: `flag_england`,
					keywords: [`flag`, `england`]
				},
				{
					emoji: `🏴󠁧󠁢󠁳󠁣󠁴󠁿`,
					name: `flag_scotland`,
					keywords: [`flag`, `scotland`]
				},
				{
					emoji: `🏴󠁧󠁢󠁷󠁬󠁳󠁿`,
					name: `flag_wales`,
					keywords: [`flag`, `wales`]
				}
			]
		}
	];
	r = n.flatMap((e) => e.items);
}));
//#endregion
init_emoji_data();
export { r as ALL_EMOJIS, n as EMOJI_CATEGORIES, t as pickFallbackDisplayName, init_emoji_data as t };
