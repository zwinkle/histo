"""Add position column

Revision ID: 924d02910616
Revises: f5e7dc4205cc
Create Date: 2025-06-10 10:26:12.468987

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '924d02910616'
down_revision: Union[str, None] = 'f5e7dc4205cc'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('heroes', sa.Column('image_pos_x', sa.Float(), nullable=True))
    op.add_column('heroes', sa.Column('image_pos_y', sa.Float(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('heroes', 'image_pos_y')
    op.drop_column('heroes', 'image_pos_x')
    # ### end Alembic commands ###
