<template>
    <div class="container">
        <!--            <top-component title="草根金融" :showLeft="false"></top-component>-->
        <banner></banner>
        <div class="content">
            <div class="content-shadow">
                <div class="money-inner">
                    <span class="label">申请金额：</span>
                    <span class="val">{{ $store.state.loanDetail.money }}</span>
                    <span class="label">￥</span>
                </div>
                <div class="slider">
                    <div class="slider-operation">
                        <el-button size="mini" icon="el-icon-remove" @click="subtract"></el-button>
                    </div>
                    <div class="slider-main">
                        <el-slider
                                :min="sliderMin"
                                :max="sliderMax"
                                v-model="getLoanMoney"
                                :show-tooltip="false"
                        ></el-slider>
                    </div>
                    <div class="slider-operation">
                        <el-button size="mini" @click="addMoney" icon="el-icon-circle-plus"></el-button>
                    </div>
                </div>
                <div class="term">
                    <div class="term-date" v-for="row in termList">
                        <div v-for="(item, index) in row">
                            <el-button
                                    size="mini"
                                    :class="{ active: item.active }"
                                    @click="handleTermClick(item, row)"
                            >{{ item.label }}</el-button>
                        </div>
                    </div>
                </div>
                <div class="line"></div>

                <div class="term-money">
                    <el-row>
                        <el-col :span="6" style="text-align: left">每期还款</el-col>
                        <el-col :span="12" style="text-align: left">
                            <span class="val">{{ termMoney }}</span>
                            <span class="label">元</span>
                        </el-col>
                    </el-row>
                </div>

                <div class="tooltip">
          <span>
            (含月利率
            <span id="rixi">{{ moneyRate }}</span>% ￥
            <i id="fuwufei">{{ termMoney }}</i>元)
          </span>
                </div>

                <div class="contract">
                    <el-checkbox v-model="contract">同意</el-checkbox>
                    <span class="detail" @click="dialogVisible = true">《借款协议》</span>
                </div>
                <div class="submit-btn">
                    <el-button @click="handleApply">申请贷款</el-button>
                </div>
            </div>
        </div>

        <el-dialog
                title="《贷款协议》"
                class="agreement-dialog"
                :visible.sync="dialogVisible"
                width="80%"
                :before-close="handleClose"
        >
            <div class="content">
                <br />
                <strong>借款协议</strong>
                <br />1、《借款协议》是指本协议（以下简称“借款协议”或“本协议”），其全部内容由甲、乙双方在线以类似点击确认方式视为认可并签署，并严格受其约束行使权利、履行义务。
                2、借款人（“甲方”）是指借款协议中列明的符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力，独立行使和承担本协议项下权利义务的自然人。甲方为在丙方平台完成注册，并符合丙方平台注册资质要求的有效用户，有借款需求。
                3、出借人（“乙方”）是指借款协议中列明的符合中华人民共和国法律规定的具有完全民事权利能力和民事行为能力，独立行使和承担本协议项下权利义务的自然人。乙方为丁方平台上的注册用户，愿意出借合法取得的自有资金。
                4、居间方丙方（“丙方”）是指借款协议中列明的德古国际融资租赁有限公司（以下简称“德古”），其是一家在天津市合法成立并有效存续的有限责任公司，为甲方提供信息服务、媒介服务、合同管理、贷后管理等平台服务，并与甲方签订《平台服务协议》，丙方有权收取居间服务费（包括前期服务费与分期服务费）。
                5、居间方丁方（“丁方”）是指借款协议中列明的方正国际商业保理有限公司（以下简称“方正”），其是一家在天津市合法成立并有效存续的有限责任公司，为甲、乙双方的借款搭建平台，提供信息服务、合同管理等平台服务，丁方有权收取居间服务费。丁方的居间服务费由丙丁双方根据约定，由丙方代收并支付给丁方，甲方不额外向丁方支付费用。
                6、风险准备金是为保护债权人的利益而设立的风险共担资金，专门用于在一定限额内满足各方协议约定的条件下垫付因甲方违约所造成的乙方及/或债权受让人的本金及利息损失。风险准备金由丙方在银行/第三方支付机构开立专门风险准备金帐户，并进行统一管理，严格与经营资金账户分离，接受第三方合作银行监管。
                7、本协议项下甲方、乙方、丙方、丁方单独称“一方”，任意两方合称“双方”，任意三方合称“三方”，任意四方合称“各方”。
                8、工作日是指除国家法定节假日、公休日以外的丙方、丁方对外办理业务的任何一日。
                <br />
                <strong>第一条 借款</strong>
                <br />1、借款标的各项相关内容以《借款标的明细》中列明的内容为准，甲方同意并授权丙方于借款起息日预先提取风险准备金和收取居间服务费，并在发放借款时即从本金金额中扣除，风险准备金和居间服务费具体计算方式以平台发布的《风险准备金规则》和甲方与丙方签订的《平台服务协议》为准。
                2、借款期限是指《借款标的明细》中列明的借款起息日起至借款到期日（最后一期还款日）之间的期间，发生逾期还款的，协议期限延续至实际还清款项日。
                3、借款起息日是指借款标满开始计算利息的日期。
                4、还款日是指本协议中甲方还款到达甲方还款账户之日，为借款起息日对应的每期自然月日期的前二日（20:00之前），当期无借款起息日对应日期的，以当月最后一日的前一日为还款日（20:00之前）。
                5、乙方按照丁方平台的规则接受丁方平台发布的甲方的借款申请，对平台发布的投资计划类似点击“充值”按钮时，即视为乙方阅知并同意本协议（以电子形式生成），并向丁方发出不可撤销的授权指令，授权丁方委托其指定的第三方支付机构从乙方的“存钱罐”账户划扣出借资金至甲方指定的收款账户，完成借款，扣款金额等于本协议《借款标的明细》所列的借款本金金额。
                <br />
                <strong>第二条 正常还款</strong>
                <br />1、还款方式以《借款标的明细》中列明的方式为准，甲方须在还款日当日24:00前支付相当于《还款计划》中列明的包括本金、利息以及依照《平台服务协议》应当支付的相应全部款项至甲方还款账户。
                2、甲方应通过类似点击“还款”的方式进行还款操作，按时足额将还款金额支付至甲方还款账户，由于余额不足、账户问题、甲方操作失误等原因导致划款失败的由甲方承担相应责任。
                3、甲方不可撤销地授权丙方向银行/第三方支付机构发出划款指令，从甲方还款账户中划扣相当于当期甲方应还款项的全部金额，第三方支付机构在接到划款指令后成功划转还款至乙方账户的视作甲方还款成功，由于账户余额不足、账户原因、甲方操作失误等原因导致划款失败的由甲方承担相应责任。
                4、乙方不可撤销地授权丙方或丙方的合作方向银行/第三方支付机构发出划款指令，将还款本息支付至乙方“存钱罐”账户。
                <br />
                <strong>第三条 逾期还款</strong>
                <br />1、甲方未能在任何一个还款日20:00前足额支付还款金额至甲方还款账户的，视作逾期还款。
                2、甲方逾期还款的，自还款日后第3日起向丙方支付逾期管理费，具体以甲方与丙方签订的《平台服务协议》为准。
                3、甲方逾期还款的，丙方以风险准备金垫付逾期欠款。乙方授权丙方在垫付逾期欠款后即有权代为向甲方追讨相关款项，具体垫付方式和额度以相关协议和《风险准备金规则》为准。
                4、、甲方逾期还款的，根据本协议项下的授权委托，丙方或丙方的合作方合作的银行或第三方支付机构有权从甲方账户中代扣或向相应各方代还其应付款项，还款优先顺序如下：
                （1）逾期仅有一期的，还款顺序依次为实现债权的费用、逾期管理费、居间服务费、利息、本金；
                （2）逾期多期的，优先偿还逾期在先的各期应还款项，各期应还款项的还款顺序为实现债权的费用、逾期管理费、居间服务费、利息、本金。
                5、任何一期逾期超过5日，或累计逾期达到3次，或其他丙方、丁方认为甲方资信较差的情况发生，导致甲方可能无力偿还借款的，乙方授权丙方、丁方可以宣告借款提前到期，宣告提前到期时甲方的应还款及顺序如下：
                （1）宣告提前到期当期之前已经产生的各期逾期管理费，以及各期的居间服务费、利息、本金；
                （2）宣告提前到期当期的居间服务费、利息、本金；
                （3）宣告提前到期当期之后的全部剩余本金。
                如甲方未能于宣告提前到期当日偿还如上全部应还款金额，则除上述应还款金额外，还须自宣告提起到期之日后第一日起向丙方支付逾期管理费，具体以甲方与丙方签订的《平台服务协议》为准，并优先于宣告到期后应支付的其他款项支付。
                6、甲方发生任何一期逾期超过3日，甲方个人信息将可能进入信用征信系统，由此产生的后果由甲方承担。
                7、甲方发生逾期情形的，乙方在此不可撤销的授权丙方进行催收，并授权丙方可转授权给丙方的合作方，催收方式包括但不限于：发送网站、APP推送通知，发送短信，发送函件、电话催收，拜访催收，提起诉讼/仲裁等。
                <br />
                <strong>第四条 提前结清</strong>
                <br />1、甲方可以在丙方平台发起提前结清服务申请，服务是否可用以操作界面展示为准（受银行结算等影响，部分日期可能无法发起申请
                2、甲方选择提前结清的，应一次性全额偿还全部款项（包括全部本金、利息、居间服务费等），具体金额以甲方与丙方签订的《平台服务协议》为准；
                3、甲方通过丙方平台就本协议项下借款发起提前结清服务申请，并完成提前结清后，乙方不享有结清日后各期利息。
                <br />
                <strong>第五条 债权、债务转让</strong>
                <br />1、未经乙方或乙方委托丙方、丁方事先书面（包括但不限于电子邮件等方式）同意，甲方不得将本协议项下的任何权利义务转让给任何第三方。
                2、乙方可通过签订《债权转让协议》向第三方转让本协议项下权利义务，转让后甲方即向新的债权人履行本协议项下全部义务。
                <br />
                <strong>第六条 风险准备金垫付</strong>
                <br />1、甲方未能在任何一个还款日支付足额还款金额至还款账户的，视作逾期还款。如甲方逾期还款，丙方将按照《风险准备金规则》从风险准备金账户中提取一定资金用于偿付借款人逾期未还款项。
                2、风险准备金的资金使用规则和垫付后追偿规则以《风险准备金规则》为准。
                <br />
                <strong>第七条 费用和风险准备金</strong>
                1、甲方、乙方已充分知晓丙方、丁方提供本协议所约定的服务可能向甲方收取的费用（不包括本金、利息）以及提取的风险准备金，并由《风险准备金规则》、甲方与丙方签署《平台服务协议》等加以确认。
                2、各方知晓并认可风险准备金产生的利息收益归丙方所有。&gt;
                <br />
                <strong>第八条 承诺与保证</strong>
                <br />1、甲方及乙方各自在此确认其为具有完全民事权利能力和完全民事行为能力的自然人，有权签订并履行本协议，并充分知晓民间借贷行为可能存在的各类风险。
                2、乙方保证其所用于出借的资金来源合法，且乙方是该资金的合法支配权人，如第三方对资金归属、支配权、合法性等问题主张异议且获得支持的，乙方应当就其给他方造成的损失赔偿损失。
                3、甲方、乙方应及时并如实向对方及丙方、丁方、指定的第三方（银行/第三方支付机构）提供个人信息（包括但不限于姓名、身份证号、联系方式、联系地址、职业信息、联系人信息等）以及借款用途等相关信息。
                4、甲方、乙方承诺并保证向其他各方提供的所有个人信息均真实、完整、有效、及时。因上述任何个人信息及资料的变更、修改、停用等，至少提前2个工作日通知其他各方。
                5、如甲方或乙方变更账户信息（账户名称、账号等）、通讯地址的，应当至少在当期款项交付日前2个工作日通知丙方和丁方。如因未能遵守上述承诺而导致的损失，由各方自行承担。
                6、甲方承诺如发生任何影响或者可能影响甲方经济状况、信用状况、还款能力的事由，包括但不限于甲方的工作单位、职位、工作地点、薪酬等事项的变化，甲方应于前述变更发生之日起2个工作日内通知丙方。
                7、甲方承诺根据本协议列明的借款用途使用借款资金，并保证不挪用借款资金或将借款资金用于以下目的和用途：
                （1）以任何形式进入证券市场，或用于股本权益性投资；
                （2）用于房地产项目开发；
                （3）用于赌博；
                （4）用于国家法律法规明令禁止或限制的各项其他活动。
                8、各方承诺，各方不会利用丙方、丁方平台进行信用卡套现、洗钱、非法集资或其他不正当交易行为，否则应依法独立承担法律责任。
                9、各方确认，甲方和乙方授权和委托丙方、丁方根据本协议所采取的全部行动和措施的法律后果均归属于甲方和乙方本人；在任何情形下，丙方、丁方不是本协议项下任何借款或债务的债务人，亦无需以其自有资金偿还本协议项下的任何借款或最终债务。
                10、各方确认，丙方、丁方或合作方因计算机系统维护、故障、黑客攻击、电信部门技术调整或故障、网站升级、银行、第三方支付平台或金融相关等部门的意外事件、法律法规及政策调整、不可抗力等状况导致无法正常运作，使得甲方、乙方无法正常使用各项本协议项下服务时，丙方、丁方或合作方不承担损害赔偿责任。
                11、各方知晓并认可丙方、丁方与银行、第三方支付机构的合作，确认并同意因资金在途或划转延迟等可能产生的利息收益归丙方所有。
                <br />
                <strong>第九条 违约</strong>
                <br />1、发生下列任何一项或几项情形的，视为甲方违约：
                （1）甲方违反其在本协议所做的任何承诺和保证的；
                （2）甲方的任何财产遭受没收、征用、查封、扣押、冻结等可能影响其履约能力的不利事件，且不能及时提供有效补救措施的；
                （3）甲方的财务状况出现影响其履约能力的不利变化，且不能及时提供有效补救措施的。
                2、若甲方违约或丙方合理判断甲方可能发生违约事件的，乙方及/或乙方的债权受让人（或授权丁方）有权采取下列任何一项或几项救济措施：
                （1）立即暂缓、取消发放全部或部分借款；
                （2）宣布已发放借款全部提前到期，甲方应立即偿还所有应付款项；
                （3）解除本协议；
                （4）采取法律、法规以及本协议约定的其他救济措施。
                3、丙方向乙方及/或乙方的债权受让人进行偿付后，乙方、丁方应积极协助丙方向甲方追偿（包括但不限于签署、提供相应书面材料等），若因乙方及/或乙方的债权受让人的原因导致丙方不能追偿的，乙方及/或乙方的债权受让人应向丙方承担赔偿责任或返还偿付款项。
                <br />
                <strong>第十条 证据和计算</strong>
                <br />1、本协议各方确认并同意，由丙方对本协议项下所涉的任何金额进行计算；丙方可通过其自身及其合作的银行/第三方支付机构提供的电子数据信息进行计算、统计，对法院需要认定的必要费用提供财务凭证。在无明显错误的情况下，丙方对本协议项下任何金额的任何证明或确定，应作为该金额有关事项的终局证明。
                2、甲乙双方委托丙方、丁方对相关金额进行计算，并在丙方、丁方平台发布或更新具体信息。上述还款明细中列明的每月还款本息金额若与发布或更新的还款明细不一致的，以平台上发布或更新的还款明细为准。
                <br />
                <strong>第十一条 保密条款</strong>
                <br />1、各方应将其在本协议及其附属合同、文件的签订和履行过程中取得的有关内容以及与此等内容有关的任何文件、资料或信息视为保密信息（以下简称“保密信息”）。
                2、任意一方向其他各方承诺，其不会使用或向非本协议方披露保密信息，除非事先得到其他三方的书面同意。
                3、下述信息不适用于保密信息的披露：
                （1）该等信息已为公众所知；
                （2）任何适用法律要求披露的、或者有权的司法机关、政府机关、监管机关要求披露的、或者法院裁定要求披露的信息；
                （3）相关方在正当履行本合同时披露的或随本合同而相应披露的信息；
                （4）相关方从第三方获得的且无须承担保密义务的信息。
                但是上述第（3）项或第（4）项信息的披露必须基于接收方对上述信息保密并且接收方仅可为披露之目的使用上述信息。
                4、保密信息应绝对保密，未经本协议各方以书面方式一致同意，任何一方不得向除政府审批机构、顾问（包括律师、会计师、评估师和其他专业顾问）、为本合同的交易提供服务的机构、股东和相关工作人员之外的任何与本合同无利害关系的第三人披露本合同任何条款。
                5、本协议项下的任何一方应采取所有其他必要、适当的措施，以确保保密信息的保密性。
                6、不论本协议是否有效或者是否履行完毕，本条中规定的保密义务不因此受到任何影响。
                7、保密条款在本协议合法解除、终止或履行完毕后继续有效。
                <br />
                <strong>第十二条 知识产权</strong>
                <br />1、丙方、丁方及关联公司所有系统、提供的服务、本协议所有内容，包括但不限于产品名、商标、网站名、网站架构、网站画面、网站设计、著作、图片、档案等无形资产（包括但不限于商标权、专利权、著作权、商业秘密等）均由丙方、丁方或关联公司所有。
                2、非经丙方、丁方或关联企业书面同意，任何人不得擅自使用、修改、反向工程、反汇编、反编译、复制、公开传播、散布、发行或公开发表丙方、丁方程序或内容。
                3、尊重知识产权是甲方应尽的义务，任何人侵犯了丙方、丁方和/或关联公司的知识产权，应当承担损害赔偿责任，乙方拥有追究其责任的权利。
                <br />
                <strong>第十三条 通知</strong>
                <br />1、本协议任何一方根据本协议约定做出的通知和/或文件均应以书面形式做出（不包括本协议第七条因贷后管理服务所涉内容），可由专人送达、挂号邮递、特快专递或通过丙方网络平台发布等方式传送，具体送达信息以本协议约定或各方在丙方、丁方平台的注册信息或登记信息为准。
                2、通知在下列日期视为送达：
                （1）专人递送的通知，在专人递送之交付日为有效送达；
                （2）以挂号信（付清邮资）发出的通知，在寄出（以邮戳为凭）后的五（5）个工作日内为有效送达；
                （3）以特快专递（付清邮资）发出的通知，在寄出（以邮戳为凭）后的三个（3）工作日内为有效送达；
                （4）通过丙方网络平台发布的方式通知的，在丙方网络平台发布之日为有效送达。
                <br />
                <strong>第十四条 法律适用和管辖</strong>
                如果各方在本协议履行过程中发生争议，由北京海淀区人民法院管辖，因诉讼产生的诉讼费、律师代理费等相关费用由败诉方承担。
                <br />
                <strong>第十五条 其他</strong>
                <br />1、甲方希望通过丙方、丁方运营平台向乙方借款，乙方亦同意借款。各方协商一致，达成本协议。
                2、本协议自借款标满起息之日起生效。
                3、本协议中部分条款根据相关法律法规等的规定成为无效，或部分无效时，该等无效不影响本协议项下其他条款的效力，各方仍应履行其在本协议项下的义务。
                4、本协议项下的附件和补充协议构成本协议不可分割的一部分。
                5、本协议各方委托丙方、丁方保管所有与本协议有关的书面文件或电子信息；本协议各方确认并同意由丙方、丁方提供的与本协议有关的书面文件或电子信息在无明显错误的情况下应作为本协议有关事项的终局证明。
                （以下无正文）
            </div>
            <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
      </span>
        </el-dialog>

        <footerComponent :idx="0"></footerComponent>
    </div>
</template>

<script type="application/ecmascript">
  import banner from "../../components/loan/banner.vue";

  export default {
    data: function() {
      return {
        money: 0,
        sliderMin: 5000,
        sliderMax: 50000,
        termMoney: 0,
        moneyScale: 1000,
        lists: [
          {
            cls: "",
            tit: "微额借款",
            con: "金额500、1000元，期限7天、14天、21天",
            url: "/loan/loanmicro"
          },
          {
            cls: "icon02",
            tit: "小额贷款",
            con: "最高金额5000元，最长期限6个月",
            url: "/loan/loanlarge"
          }
        ],
        termList: [],
        dialogVisible: false,
        contract: false,
        moneyRate: 0,
        currentItem: {}
      };
    },
    watch: {
      "$store.state.loanDetail.money"(val) {
        this.getMoneyRate();
      }
    },
    computed: {
      getLoanMoney: {
        get() {
          return this.$store.state.loanDetail.money;
        },
        set(val) {
            var tempMoney = val
            if (tempMoney >= this.sliderMax) {
                tempMoney = this.sliderMax
            } else if (tempMoney <= this.sliderMin) {
                tempMoney = this.sliderMin
            } else {
                tempMoney = val / this.moneyScale
                tempMoney = tempMoney.toFixed(0)
                tempMoney = tempMoney * this.moneyScale
            }
            val = tempMoney
            this.$store.commit("setLoanDetail", { prop: "money", val });
        }
      }
    },
    created() {
      this.$request.get("getloanRange").then(res => {
        // 请求金额区间，sliderMin 和 sliderMax是金额区间
        this.sliderMin = res.min;
        this.sliderMax = res.max;
        this.defaultMonth = res.defaultMonth;
        this.money = res.defaultMoney;
        this.currentItem = {
          month: res.defaultMonth,
          money: res.defaultMoney
        };
        this.$store.commit("setLoanDetail", {
          prop: "monthNum",
          val: res.defaultMonth
        });
        this.$store.commit("setLoanDetail", {
          prop: "money",
          val: res.defaultMoney
        });
        this.$request.get("getLoanRate", { split: true }).then(resp => {
          const { data } = resp;
          data.forEach(row => {
            row.forEach(item => {
              item["label"] = item.month + "月";
              item["value"] = item.month;
              item["rate"] = item.rate / 10000;
              item["active"] = this.defaultMonth == item.value ? true : false;
              if (item["value"] == res.defaultMonth) {
                this.currentItem["rate"] = item.rate;
                this.currentItem["value"] = item.value;
              }
            });
          });
          this.termList = data;
          this.getTermMoney();
        });
      });
      this.$request.get("systemfind").then(res => {
        if (res.status) {
            this.moneyScale = res.data.accuracy
        }
      });

      this.termList.forEach(row => {
        row.forEach(item => {
          if ((item.value = _this.currentItem.month)) {
            this.currentItem = { item };
            return;
          }
        });
      });
      // this.handleTermClick(this.currentItem, []);
      // this.$store.commit('setLoanDetail', this.money) // 放在请求中使用，值为slid
    },
    methods: {
      subtract() {
        let { money } = this.$store.state.loanDetail;
        money -= this.moneyScale;
        if (money <= this.sliderMin) {
          money = this.sliderMin;
        }
        this.$store.commit("setLoanDetail", { prop: "money", val: money });
      },
      addMoney() {
        let { money } = this.$store.state.loanDetail;
        money += this.moneyScale;
        if (money >= this.sliderMax) {
          money = this.sliderMax;
        }
        this.$store.commit("setLoanDetail", { prop: "money", val: money });
      },
      getTermMoney() {
        let { rate } = this.currentItem;
        const { money } = this.$store.state.loanDetail;
        if (rate && money) {
          const allMoney = money + money * rate * this.currentItem.value;
          rate = (rate*100).toFixed(2);
          this.moneyRate = rate;
          this.termMoney = (allMoney / this.currentItem.value).toFixed(2);
          this.$store.commit("setLoanDetail", {
            prop: "termMoney",
            val: this.termMoney
          }); // 每月应还
          this.$store.commit("setLoanDetail", { prop: "moneyRate", val: rate }); // 利率
        }
      },
      getMoneyRate() {
        this.getTermMoney();
      },
      handleClose() {},
      handleApply() {
        const { monthNum } = this.$store.state.loanDetail;
        if (!this.contract || !monthNum) {
          let message = "";
          if (!this.contract) message = "请先勾选借款协议";
          if (!monthNum) message = "请先选择分期";
          this.$message({
            showClose: true,
            message,
            type: "warning"
          });
          return;
        }
        this.$router.push({ name: "loanDetail" });
        /*this.$request.get('').then(data=> { // 判断有没有订单在，暂时先注释
            this.$message({ // 如果有订单就调用这个
              message: '您当前有订单存在',
              type: 'success'
            });
            this.$router.push({ name: 'loanDetail' }) // 如果没有就调用这个
          });*/
      },
      handleTermClick(item, row) {
        this.termList.forEach(row => {
          row.forEach(item => {
            item.active = false;
          });
        });
        item.active = true;
        this.currentItem = item;
        this.getMoneyRate();
        this.$store.commit("setLoanDetail", {
          prop: "monthNum",
          val: item.value
        });
      }
    },
    components: {
      banner
      //        topComponent
    }
  };
</script>

<style type="text/css" scoped lang="less">
    @import "~@/common/var.less";

    .container {
        background: #fff;

        &:before {
            height: 0;
        }

        > .content {
            background: #fff;
            padding: 20px 0;

            .money-inner {
                text-align: center;

                .label {
                    color: #606266;
                }

                .val {
                    font-weight: bold;
                    color: red;
                    display: inline-block;
                    width: 80px;
                }
            }

            .content-shadow {
                width: 94%;
                height: auto;
                margin: 5% auto;
                border-radius: 4px;
                box-shadow: 0px 1px 6px 1px #ccc;
                padding: 10px;
                box-sizing: border-box;

                .term-date {
                    margin-bottom: 4px;
                    overflow: hidden;
                    > div {
                        width: 20%;
                        float: left;
                        margin-bottom: 3px;
                        button {
                            width: 95%;
                            &.active {
                                color: #3a8ee6;
                                border-color: #3a8ee6;
                                outline: 0;
                            }
                        }
                    }
                }

                .contract {
                    span {
                        color: @themeColor;
                    }

                    .detail {
                        display: inline-block;
                        line-height: 19px;
                        font-size: 14px;
                    }
                }

                .slider {
                    width: 100%;
                    margin: 0 auto;
                    overflow: hidden;
                    .slider-operation {
                        float: left;
                        width: 40px;
                        text-align: center;
                        position: relative;
                        top: 3px;
                        &:first-child {
                            text-align: left;
                        }
                        /deep/button {
                            i {
                                font-size: 14px;
                            }
                        }
                    }
                    .slider-main {
                        float: left;
                        width: calc(100% - 80px);
                    }
                    .el-slider__runway {
                        margin-top: 10px;
                    }
                }

                .el-button--mini {
                    padding: 7px;

                    &:last-child {
                        /*float: right;*/
                    }
                }

                .line {
                    height: 1px;
                    margin-top: 10px;
                    background: #dcdfe6;
                    margin-top: 15px;
                }

                .term-money {
                    font-size: 14px;
                    color: #666;
                    height: 26px;
                    line-height: 26px;
                    padding: 5px 0;

                    .el-col {
                        text-align: center;

                        &:nth-of-type(2) {
                            font-size: 16px;

                            .val {
                                color: @themeColor;
                                font-weight: bold;
                            }
                        }
                    }
                }

                .tooltip {
                    font-size: 12px;
                    color: #999;
                    margin-bottom: 10px;
                }

                .submit-btn {
                    margin-top: 15px;
                    text-align: center;

                    .el-button {
                        height: 35px;
                        line-height: 35px;
                        width: 100%;
                        background: @themeColor;
                        padding: 0;
                        color: #fff;
                    }
                }
            }
        }

        .agreement-dialog {
            /deep/ .el-dialog {
                /*position: absolute;*/
                width: 80%;
                /* left: 50%;
                           top: 50%;
                           margin-top: 0!important;*/
                /*transform: translate(-50%, -50%);*/

                /deep/ .el-dialog__header {
                    text-align: center;
                    padding: 0;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    border-bottom: 1px solid #fb6f00;

                    .el-dialog__title {
                        font-size: 16px;
                        color: #fb6f00;
                    }
                }

                .el-dialog__body {
                    color: #000;
                    padding: 20px;
                    height: 340px;
                    overflow: auto;

                    .content {
                        line-height: 20px;
                    }
                }

                /deep/ .el-dialog__footer {
                    margin-top: 10px;
                    padding: 10px;
                    border-top: 1px solid #fb6f00;
                    text-align: center;

                    .el-button {
                        width: 50%;
                    }
                }
            }
        }
    }
</style>
