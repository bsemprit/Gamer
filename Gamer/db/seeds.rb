# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bianca = User.create(name: "Bianca", email: "bsemprit@gmail.com", password: "123123123", password_confirmation: "123123123", role: "adminGamer")
anais = User.create(name: "Anais", email: "anna@gmail.com", password: "123123123", password_confirmation: "123123123", role: "adminGamer")

Humane_society = Charity.create(name: "Humane Society")

UNCF = Charity.create(name: "UNCF")

Homes_For_Our_Troops = Charity.create(name: "Homes For Our Troops")

Space_Invader = Game.create(name:"Space Ad Invaders", time: 100, description: "In a world where everything is awesome, we have Space Ad Invaders! This Game will change the way you game. Don't like ads? Destroy them in this newly recreated game filled with ads for good!")
Pac_Man = Game.create(name:"Pac Ad Man", time: 100, description: "COMING SOON... In the same world where everything is awesome, we have Pac Ad Man! This Game will change the way you game. Don't like ads? Eat or run from them in this newly recreated game filled with ads for good!")