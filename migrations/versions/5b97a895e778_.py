"""empty message

Revision ID: 5b97a895e778
Revises: 6e5a383ddfbb
Create Date: 2022-12-15 21:35:11.709755

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5b97a895e778'
down_revision = '6e5a383ddfbb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservas', schema=None) as batch_op:
        batch_op.alter_column('estado',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reservas', schema=None) as batch_op:
        batch_op.alter_column('estado',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###