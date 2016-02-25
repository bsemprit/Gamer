# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

bianca = User.create(email: "bsemprit@gmail.com", password: "123123123", password_confirmation: "123123123", role: "adminGamer")
anais = User.create(email: "anna@gmail.com", password: "123123123", password_confirmation: "123123123", role: "adminGamer")

# space_invader = Game.create(name: "Space Invader", description: "")