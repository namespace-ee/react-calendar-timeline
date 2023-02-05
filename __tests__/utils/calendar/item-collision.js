import { isCollision } from "../../../src/lib/utility/generic";


describe('item collision', ()=>{

  const items = [
    {
      id: '1',
      group: '1',
      start_time: 100,
      end_time: 120,
      canMove: false,
      canResize: false,
      className: ''
    },
    {
      id: '2',
      group: '1',
      start_time: 110,
      end_time: 120,
      canMove: false,
      canResize: false,
      className: ''
    },
    {
      id: '3',
      group: '1',
      start_time: 200,
      end_time: 250,
      canMove: false,
      canResize: false,
      className: ''
    },
    {
      id: '4',
      group: '1',
      start_time: 210,
      end_time: 240,
      canMove: false,
      canResize: false,
      className: ''
    },
    {
      id: '5',
      group: '1',
      start_time: 210,
      end_time: 240,
      canMove: false,
      canResize: false,
      className: ''
    },
    {
      id: '6',
      group: '1',
      start_time: 115,
      end_time: 130,
      canMove: false,
      canResize: false,
      className: ''
    },
  ];

  describe('From sides', () => {

    it('From left', () => {
      isCollision(items, 1, (currentItem, item) => {
        expect(currentItem.id).toBe(items[1].id);
        expect(item.id).toBe(items[0].id);
      });

      isCollision(items, 2, () => {
        throw new Error('Don\'t call me');
      });
    });

    it('From right', () => {
      isCollision(items, 0, (currentItem, item) => {
        expect(currentItem.id).toBe(items[1].id);
        expect(item.id).toBe(items[0].id);
      });

      isCollision(items, 2, () => {
        throw new Error('Don\'t call me');
      });
    });
  });

  describe('From nested', () => {
    it('From inside', () => {
      isCollision(items, 3, (currentItem, item) => {
        expect(currentItem.id).toBe(items[3].id);
        expect(item.id).toBe(items[2].id);
      });
    });
  });

});
