class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.references :game_profile, index: true, foreign_key: true
      t.integer :timePlayed
      t.integer :score
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
