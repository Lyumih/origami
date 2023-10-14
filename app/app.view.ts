namespace $.$$ {
	export class $origami_app extends $.$origami_app {

		autorun(): void {
			$mol_map_yandex.api_key = () => "3b2caac0-490e-4fdc-92de-d2a09e400365"
			super.autorun()
		}

		body(): readonly any[] {
			let page = this.$.$mol_state_arg.value('page') || 'default'
			const configs: Record< string, $mol_view | undefined> = {
				route: this.Route(),
				map: this.World(),
				bank: this.Bank(),
				atms: this.Atms(),
				todo: this.Todo(),
			}
			return [configs[page] ?? this.Welcome()]
		}

		@$mol_mem
		todo_test() {
			let result = this.$.$mol_fetch.json( 'https://origami-team.site/todo/f9850879-d439-434d-88c2-a4797d90b110' )
			return result
		}
	}
}
