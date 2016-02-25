class CreateUserCharities < ActiveRecord::Migration
  def change
    create_table :user_charities do |t|
      t.references :user, index: true, foreign_key: true
      t.references :charity, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
