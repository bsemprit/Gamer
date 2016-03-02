class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :games, through: :gamerProfile
  has_many :charities, through: :userCharities
  has_many :charities, through: :donations
  has_many :donations
  has_many :gameSessions
end
