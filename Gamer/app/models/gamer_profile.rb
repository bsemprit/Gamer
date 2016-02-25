class GamerProfile < ActiveRecord::Base
  belongs_to :user
  belongs_to :game
  has_many :users, through: :GamerProfile
end
