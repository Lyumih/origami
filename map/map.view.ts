namespace $.$$ {
	export class $origami_map extends $.$origami_map {
		
		static api() {
			console.log(123)
			const KEY = '3b2caac0-490e-4fdc-92de-d2a09e400365'
			let a = $mol_map_yandex.api()
			console.log(a)
			return $mol_import.script( `https://api-maps.yandex.ru/2.1/?lang=${ $mol_locale.lang() }` ).ymaps
		}
		
	}
}
