package me.samupanz18.playground.engineering.playspock.getstarted

import spock.lang.Specification

class FirstSpecification extends Specification {
	def "one plus one should equal two"() {
		expect:
		1 + 1 == 2
	}
	
	def "tow plus two should equal four"() {
		given:
			int left = 2
			int right = 2
		when:
			int result = left + right
		then:
			result == 4
	}
}