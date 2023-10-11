namespace $.$$ {
	export class $origami_app extends $.$origami_app {
		
		@ $mol_mem
		todo_test() {
			let result = this.$.$mol_fetch.json('http://31.129.109.90/todo/f9850879-d439-434d-88c2-a4797d90b110')
			console.log(result)
			return result
		}
	}
}
