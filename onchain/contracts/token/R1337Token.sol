// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface ITokenUri {
    function imageURI0() external view returns (string memory);
}

contract R1337Token is ERC1155, Ownable {
    event Lotteried(uint lotteryNumber);
    ITokenUri tokenUri;

    bool public paused = true;
    uint public counter; //For cap
    mapping(uint => address) public elite1337s;

    string name0 = "You are not Redstone 1337";
    string name1 = "You are Redstone 1337";
    string description0 =
        "Are you 1337? R1337 is a fully onchain game on RedStone. Play it here! https://f1337.vercel.app/";
    string description1 =
        "Are you 1337? R1337 is a fully onchain game on RedStone. Play it here! https://f1337.vercel.app/";

    string public imageURI1 =
        "data:image/gif;base64,R0lGODlhYANgA/e1APNCQvJBQPVERO4+PvE/P/RDQ+9AQPFCQfFGRfJdXfNHR/NJSfNLS/NnZ/RERPRUVPRXVvVpafVsbPVvb/Zzc/Z2dvaPj/dnZ/d+fveEhPednfuQkPvFxfyvr/y+vv7Z2f7g4P7j4/7o5/7q6v/t7f/w8P/y8v/29v/5+f/8/P/+/v////FBQfNqavRiYvVeXvVmZvaJifafn/dxcPeHh/zIyP3NzfOEhPhsbPiUlPqMjPvBwfqsrPuhofBHR/NNTfJ4d/OCgvmjo/mrq/NGRfVra+9RUfBjY/FXV/JDQ/JFRfJaWvJvb/NGRvNQUPNTUvN1dPRaWvRgYPVycfaYmPeCgfh2dvh4ePiJifiLi/ioqPm0tPqoqPq6uvq9vfrOzvzb2/3W1v3d3f7Kyv7T0v719P/X1u5DQvBERPBLSvFfX/NFRfWrq/aSkvejo/iYmPilpfmenfmgn/m3t/qbm/q/v/2trf26uv7U1P7m5v/z8/NDQ/V/f/Z6evihoPiurvqvr/zKyv24uP/Z2e5UVPBtbfNEQ/R8fPWGhvaMjPmlpfmtrfqFhfqzs/uTk/NDQvVkY/aUlPiSkfiwsPqXl/vDw//Ozv/c3P/l5e5BQfRcXPR6evirq/ukpPu2tf7ExO9OTvJERP7Hx//V1e5JSe9mZvJ6evNERPWwsPmqqvmsrPmwsPmxsfpvbvqxsfyIiPyrq/2mpv2pqf2xsf2zswD/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFHgC1ACwAAAAAYANgAwAI/wAHCCAwsKBAggcNKkzIcKFDhA8jQpwosWJDihctaszIcaNHjB9DghwpsmRHkidNqkzJcqVLlC9jwpwps2ZLmjdt6szJc6dPnD+DAh0aAEDRowWQKjWalOnSp06jQp3alKrVqlivapWalevWr17Dgh3blazZsmjPqhWblu3at27jwp3blq7dunjv6pWbl+/ev34DAx7cl7DQw0R7JkbMeLHjxpAVR54suTLly48tZ8bMebPnzqA1Gy5MerRpwaVRn16tujXr16lhy45Ne7Zt17Vx396tuzfv0MBFCw9O/PNw48WTI1+uvPlx59CfS4/+23fu6tiva8/O3Xr3797Dg/8fv118efLopzNXT319+/fu48Ofz74+/fvy7efHn76/ef8A/idggASeZ2CBCA54oIIJNrjfg/xBqF+EFE5oYYUYSpjhhhp2yKGDIC4Y4ogilkjiiQymiOKKJnp4oYsfvhjjjDLWSOONMOaI444qtsjijz4GCeSQPRJpZJFIHqmkjToyyeOTTkYJ5ZRNUmlllUImmeWSXG7pZZdgahnmmGKWeeWZUmKJ5pppsulmm3C+SeacZn5ZJ5143qlnnnzaKaeacQL656CCFkrooYEi2ueie/rpKKOQNhrppJIamuililqa6aaadsrpp5VSKuqjoZI66qmmporqqp5i2iqosL7/KmustLpaK6u4qlpqrrzu6muvt9oqbLDEzjqsscUmqyuwvy7rLLPQNhvttMhWq+y1x2Krbbbcbkvtt89KKy645IZbrrfdWpsuuuyu62678Jor77njzlsvvfjeq2+8/L6rbr8A/ytwwPkWbK/BCB+scMIE+9vwww5HDPHEC+9bMcMXZ4zxxhZzTPHHA0scMsgkj6xxxyh7fLLKLK/scskwmxzzzCLT3PLNKb+cM8487yxzzUDb/LPQRA9tdM9I+5z00jozXfTTQR8dNdRUT61001g7fbXWXG8tddVgfy122GR73fXZWZudNtpsW13222O7HTfcdK9td9t4q5333nP3/13333IDzvfgd+ttOOGIB6644Iv73TjjkB9eeOKUT2555ZFn/vjmmnd+ueSYfx766KKX7vnpjqOueuqmg+466bC3HvvqtHPOeu24vy777rPr3vvvt9ue+/DCF0888Mjz7vvyyR8fvPPQPy999M0rX/311hs/vfbUc+9999iHz3z24pe/Pfjfn68++uyPb/777scPf/v0p1///fKTn//8+/fPP/4AXJ/9BhjA//lPfwZMIAEFWEAGOrCBEDygAicowQpSMIIYXGAGL4jADnLwgxbUoAg3OMIHlpCEIExhCFXIQhOi0IUwfKEMV0jDFtrQgzE8oQ5nyMMc3vCHOASiEP936MMi9vCIRByiEmsYxCYuEYlQNGISp/hEJzKxiliUYhS3qMUucjGLYLyiGMP4RS9S0YxlJKMV1cjGNZ4xjWiMIxznOEY3tvGOdaSjHuX4xj7i8Y92zKMgAbnHQvLRkIQMZCIX6cdDOhKRj2wkJBlJyUEqUpKYnGQkNcnJS1byk5bspCg3ScpRgvKUngylKk1Zyky2kpWojGUqZQnLV9qylrhc5Sx3SUte6jKXwLylK4PZy2L60pjEHKYyk4nMXzqzmdBcpjCZOc1qRvOazzymNrFJzW5aM5vcBKc4w+nNcn7TnOTc5jjVmU50nvOd7oznOts5z3rSU574hKc92cn/z3v2c5/5DKg+BerPggL0oAYlqDQVmtB/NvShC40oQwdK0YlC9KIOlWhFNWrRjXYUoyDN6Ec9StKRmhShIkVpSE/KUo66tKUrTWlMYVrSl9aUpjOVqU5zilOb9vSnKg0qT4W605saFahIJepQl6rUo/r0qUmNalGZStWpQtWpUs2qVavK1aZq9atXBWtXx+rVsJpVrFhNK1nXWla2ovWtZ1VrW+fqVrpuVa5wzSte71rXvvI1rnoNLGDt6tfCEnavgk3sYQ3L2L8q9rGIHWxjJ+vYxUo2spDNbGUpy9nNXlazoP2sZTtL2tFi9rShTa1pS8ta0ar2tahdrWdbS9vY/8L2trOVbW13a9ve4va3ug0ub4frWt8WF7jETa5wj8tc5BrXucqN7nKh29znWle62J2udqnL3epm97vbzW13x+vd8IL3vOa9bnnJy17xuhe98FVve+f73vTG977rla9+6Yvf/u43v/wFsID9S+D6BvjAA/5vgRds4AQj+MH2bTCDJ6zgCkP4whGmsIYt7OAOY3jDIJYwhz884hKH+MQZNrGHVUxiFLs4xS1msYxj/OIaz3jFNMYxjEVs4x7rOMdA5rGQfUzkGwf5yEPecZGRzGQjJ3nJT44ylJtMZSVbecpX/rGTq8zlLGP5y1vWcpfBTGYvh3nMZ5aymcvMZjG7Gf/NbY7zmt+cZjjXec5yzvOd7cxnNev5z3Tus6DxTGhAGzrQiB70oRed6D07WtGF9rOkGQ3pSj860pTGtKYtzelNT9rTme60qBsd6k+XetSoJjWoV31qVaf61aaOdatnfWlY21rWrMY1rW/N61zv2te1Dnavf01sYA/b1cJGdrGXnexjO1vX0Ga2tJtN7WdP+9rVVra2rR1tY3cb29wO97fHDW5yZ1vc6DZ3ude97XO7m93w9na6563uesf73u9uN73xze9879vf9pa3wPv974IPPOAER7i+F27whDtc4Q0HeMQfTnGGS9ziE4f4wSue8Y5v/OMcv7jHR67xkJsc4yj/J/nJV55ykbtc5SAvucxZDvOazzzmNH95y22e857rnOc/v7nPh77zogOd6EgP+tGVjvOmJ33pUDe60Kf+dKZH/epUd3rWq471rm/961yXutfHrvWwk/3sYC+72s0u9rajne1wt7rc3572uNvd7XPH+933nne6+73ugOf73wcf+LUXXvB6TzzhEc94xff98Y2PPOQdv3jDS/7yk6885jef+c5r/vCg57zoPU/50o/+9KYn/edRz/rUr971lo99619Pe9mH3vazV73ua5/73u8e9ry/ve+DT3zcG3/4wP998ZHP/OQv//jCj37zn0996UN/+srPfvWxz33tO//73Q8///i9v33ri//84y8/+tef/var//rwZ//752/++svf/eTP//33r3/805//AOh/Avh/8Wd/BUiACGiAAbiAA9h/CciAEOiAEhiBFDiBDfiACpiBFYiBHHiAHriBFtiBIDiCIViCIqiBH4iCJ7iCKUiCLmiCF9iCMviCLFiDM6iCOEiDMGiDOtiDMciDOXiDPgiERBiEQ/iDO5iERXiES4iETciEQqiETjiFUFiFVCiFTxiFVpiFXGiEXriFV9iFYDiGYViGYqiFX4iGZHiGa5iGbciGahiHb2iGWFiHc3iHdkiHcIiHfKiHfriHcuiGf5iHgNiHhjiIhRiIh7iIhNiIjP/4iI6IiJIIiZQ4iZGYiJWIiZe4iZkoiN7iAwxgAL0WittCipx4JwsAiqmoiquoBGHBirBoimnxAzCABYAQCGFwCR9ABl1ABxUAAQfQF7HYiq1IFcNYjHrxAhEgi19BjMfIimNBis8ojdTojGcxjdYojNXojNv4jFnBjeD4CNZBi30gCXQQBxaAAS7gBMFYFAwAjFLRjfIYjk2gFU7QABawBTaQi7k4B28gAU+QBHxBj/ZIkFhBj9iYjeERAUPgAq3BADNAB17wBbvIAW6AAfBIGg+AAXDAAWQQBl/g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M3Lc6BHjx5AgR4os2RFAgAIpV6JU2ZIlzJcyY9J0WfOmzZw4d87U2ZMn0J9CgxL1WfSo0aRIlw5V2pQp1KdSo1J1WvWq1axYt07V2pUr2K9iw5L1Wvas2bQm155k67Yt3LdyScalO/eu3bx499bl67cv4L+C9QYmPPiw4cSIF/8XZuy4MWS0kseqpTz5suXMmDdX5uy5M+jPojWHJj36tOnUqFeXfuxacWTYr2fLrk37dmzcunPz3u3bdm/gv4cLL06cNfLWypMzV73cefPo0KdLr/7cOvbr2rMfNx68O/jv4sOT917+vPn06NePV9+ePfft1OXHr0//vv388/Xz3++/P4D4vTcgfAS6VyCCByqYIIMGNviggxFCOOF/AgZ4oYUZYrhhhRx62CGIH4q4oIQkUniiiSmiuGKJLLrYIowvyhiihjSOeKONOeK4Y408+tgjkD/OOKSKMRZJJJJHKpkkk0Y2KWSQOkYJJZVTWlklllJmuaWTXT7p5ZJgfjn/pphlknlmmGhyuaaWbbL55pVuxgknnXOmeaeaZuKpZ5598vmnn4HuWSehchZ6qKGJIrqonYwK+uigkUI6KaCSVkoppo0qqqmjm3b6qaehgjqqpZmaWiqqp6p6Kauruioqp7GSOiustNpaK663vrprqq32yiuwvwobrK65ympssckiu6yyzQ7rK7HPRjuttNVSe+2xzmqbLbfbestst+BiOy605ZJ7rrXmpovut+2K+6678YYrL7vq1nuvvfniu++68M77L70A+xswwQMbzC/C/Sa8sL4KN8xwwREfLLDEFVN8McQOZ7yxxh1z/DHGE1s8ssglk3xyyCCr7PHDLa/8/zLLKMtscso1z3wzzTDr7HLMPe/8M884C21zzkUPfTTRQCvtc9BNL/0000hLbXTSVU99tdNRaw0111l3/bXVVGM9tthlk3321l6rDTbbabeNNtxhxz233HW/7Tbed+u9dt580/233WYHDjjhfe99uOGJI7744I0X/rjgkEvuN+WMW6545ZhPvnnknXP+ueOZXz666KWTfrrnoYO+uuqts4467KZrPnvsr6duO+6365577bL3/rvvwfO+u+vED3+88cLTrjzwzTP/PPLRJy899cU7f/3y2Gs/vfXdV/899+BvP3725ZN/vvfhqy/++umzjz785kMvf/zvu3+//fnPX/8//f3z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";

    constructor(address _tokenUri) ERC1155("") Ownable(msg.sender) {
        tokenUri = ITokenUri(_tokenUri);
    }

    function setMeta0(
        string memory _name0,
        string memory _description0
    ) external onlyOwner {
        name0 = _name0;
        description0 = _description0;
    }

    function setMeta1(
        string memory _name1,
        string memory _description1
    ) external onlyOwner {
        name1 = _name1;
        description1 = _description1;
    }

    function togglePaused() external onlyOwner {
        paused = !paused;
    }

    function uri(uint256 _id) public view override returns (string memory) {
        (
            string memory _name,
            string memory _description,
            string memory _imageURI
        ) = (_id == 1)
                ? (name1, description1, imageURI1)
                : (name0, description0, tokenUri.imageURI0());
        return
            string(
                abi.encodePacked(
                    "data:application/json;utf8,",
                    "{",
                    '"name":"',
                    _name,
                    '",',
                    '"description":"',
                    _description,
                    '",',
                    '"image": "',
                    _imageURI,
                    '"}'
                )
            );
    }

    function mint() external returns (uint lotteryNumber_) {
        require(paused == false, "Paused");
        lotteryNumber_ = lotteryNumber(block.number - 1);
        uint _id;
        if (lotteryNumber_ == 1337) {
            _id = 1;
            counter++;
            //if msg.sender has already token id 1, revert
            require(balanceOf(msg.sender, _id) == 0, "Already minted");
            require(counter <= 1337, "Cap reached");
            elite1337s[counter] = msg.sender;
        }
        emit Lotteried(lotteryNumber_);
        _mint(msg.sender, _id, 1, "");
    }

    function lotteryNumber(uint _blockNumber) public view returns (uint) {
        return uint(blockhash(_blockNumber)) % 10000;
    }

    // View function to get the lottery number of a specific block
    function getLotteryNumber() external view returns (uint) {
        return lotteryNumber(block.number - 1);
    }

    // get latest 8 numbers
    function getLotteryNumbers()
        external
        view
        returns (uint[10] memory lotteryNumbers_)
    {
        for (uint i = 0; i < 10; i++) {
            lotteryNumbers_[i] = lotteryNumber(block.number - i - 1);
        }
    }

    function getAllElites() external view returns (address[] memory elites_) {
        elites_ = new address[](counter);
        for (uint i = 1; i <= counter; i++) {
            elites_[i - 1] = elite1337s[i];
        }
    }
}
