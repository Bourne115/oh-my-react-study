import React, { useRef, useEffect, useMemo } from "react"
import {
  Table,
  TableColumnProps,
  Statistic,
  Card,
  Button,
  Input
} from "@arco-design/web-react"
import { IconArrowRise, IconArrowFall } from "@arco-design/web-react/icon"
import { useImmer } from "use-immer"
import { getUserCollege } from "@/apis"

const { Meta } = Card

interface IViewArcoCompProps {
  /**
   * @title 样式类名
   * @version v1.0.0
   * @zh 样式类名
   * @en className
   * @defaultValue demo-class
   */
  className?: string | string[]
}
type TViewArcoCompPropsWithChildren = React.PropsWithChildren<IViewArcoCompProps>

type TGoods = {
  title: string
  resName: string,
  resId: number
}

function GoodsPages(props: TViewArcoCompPropsWithChildren) {
  const {
    className
  } = props 
  const [count, setCount] = useImmer(0)

  const [goodsList, setGoodsList] = useImmer<TGoods[]>([])
  const countRef = useRef(count)
  countRef.current = count

  useEffect(() => {
    requestGoodsList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('countRef.current', countRef.current)
    }, 3000)

    return () => {
      console.log('useEffect-goodsList-destroy')
      clearTimeout(timer)
    }
  }, [])

  // useMemo 也能实现 useEffect 的一些功能
  useMemo(() => {
    console.log('useMemo-goodsList')
  }, [])



  const AddGoods = () => {
    setGoodsList((draft) => {
      draft.push({ resId: draft.length + 1, title: '新商品', resName: '新商品13' })
    })
  }

  const deleteGoods = (id: number) => {
    setGoodsList((draft) => {
      draft.splice(draft.findIndex(item => item.resId === id), 1)
    })
  }

  const editGoodsTitle = (resName: string, id: number) => {
    setGoodsList((draft) => {
      const target = draft.find((goods) => goods.resId === id)
      if(target) {
        target.resName = resName
      }
    })
  }

  const requestGoodsList = () => {
    getUserCollege().then((res) => {
      console.log(res)
      setGoodsList(() => {
        return [...res.data]
      })
    })
  }
  
  const testC = () => {
    setCount(() => {
      return count + 1
    })
  }

  const GoodsList = goodsList.map((item) => {
    return (
      <Card
        key={item.resId}
        hoverable
        style={{ width: 360, margin: "0 16px 16px 0" }}
        className={className}
        cover={
          <div style={{ height: 204, overflow: "hidden" }}>
            <img
              style={{ width: "100%", transform: "translateY(-20px)" }}
              alt="dessert"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </div>
        }
      >
        <Meta
          title={item.resName}
          description={
            <>
              { item.resId }
            </>
          }
        />
        <Input
          value={item.resName}
          style={{ width: '100%' }} 
          allowClear  
          placeholder='Please Enter something'
          onChange={(title) => { editGoodsTitle(title, item.resId) } }
        />
        <Button 
          type="primary" 
          status='danger'
          style={{ marginTop: '10px' }}
          onClick={() => {deleteGoods(item.resId)}}
        >
          Delete
        </Button>
      </Card>
    )
  })

  return (
    <>
      <Button onClick={testC}>click:{ count }</Button>
      <Button onClick={AddGoods} style={{marginBottom: '10px'}}>
        Add
      </Button>
      { GoodsList }
    </>
  )
}

function ViewArcoComp({ children }: { children: any }) {
  const columns: TableColumnProps[] = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Salary",
      dataIndex: "salary",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ]

  const data = [
    {
      key: "1",
      name: "Jane Doe",
      salary: 23000,
      address: "32 Park Road, London",
      email: "jane.doe@example.com",
    },
    {
      key: "2",
      name: "Alisa Ross",
      salary: 25000,
      address: "35 Park Road, London",
      email: "alisa.ross@example.com",
    },
    {
      key: "3",
      name: "Kevin Sandra",
      salary: 22000,
      address: "31 Park Road, London",
      email: "kevin.sandra@example.com",
    },
    {
      key: "4",
      name: "Ed Hellen",
      salary: 17000,
      address: "42 Park Road, London",
      email: "ed.hellen@example.com",
    },
    {
      key: "5",
      name: "William Smith",
      salary: 27000,
      address: "62 Park Road, London",
      email: "william.smith@example.com",
    },
  ]

  const refGrowth = useRef(null)
  const refBugs = useRef(null)
  const refTable = useRef(null)

  useEffect(() => {
    console.log(refTable.current)
    console.log("children", children)
  }, [children])

  return (
    <>
      <Statistic
        ref={refGrowth}
        title="User Growth Rate"
        value={50.32}
        precision={2}
        prefix={<IconArrowRise />}
        suffix="%"
        countUp
        styleValue={{ color: "#0fbf60" }}
      />
      <Statistic
        ref={refBugs}
        title="Population Growth Rate"
        value={2.59}
        precision={2}
        prefix={<IconArrowFall />}
        suffix="%"
        countUp
        styleValue={{ color: "#ee4d38" }}
      />
      <h2>Arco Demo Page</h2>
      <Table columns={columns} data={data} ref={refTable} />
      <GoodsPages className={['test-props-className']}></GoodsPages>
    </>
  )
}

export default ViewArcoComp
